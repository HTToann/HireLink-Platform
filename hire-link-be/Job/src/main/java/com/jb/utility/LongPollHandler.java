package com.jb.utility;


import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Supplier;

public class LongPollHandler<T> {

    private final ScheduledThreadPoolExecutor executor;

    public LongPollHandler(ScheduledThreadPoolExecutor executor) {
        this.executor = executor;
    }

    /**
     * Tạo DeferredResult long-poll với polling định kỳ
     *
     * @param timeoutMs   timeout tính bằng ms (vd 30000 = 30s)
     * @param pollIntervalMs khoảng thời gian check lặp lại
     * @param supplier    hàm lấy dữ liệu (return list)
     * @return DeferredResult<ResponseEntity<List<T>>>
     */
    public DeferredResult<ResponseEntity<List<T>>> handle(
            long timeoutMs,
            long pollIntervalMs,
            Supplier<List<T>> supplier
    ) {
        DeferredResult<ResponseEntity<List<T>>> output = new DeferredResult<>(timeoutMs);
        final AtomicBoolean finished = new AtomicBoolean(false);

        Runnable task = () -> {
            if (finished.get()) return;
            try {
                List<T> data = supplier.get();
                if (data != null && !data.isEmpty() && finished.compareAndSet(false, true)) {
                    output.setResult(ResponseEntity.ok(data));
                }
            } catch (Exception e) {
                if (finished.compareAndSet(false, true)) {
                    output.setErrorResult(ResponseEntity.status(500).body(List.of()));
                }
            }
        };

        ScheduledFuture<?> future = executor.scheduleWithFixedDelay(
                task, 0, pollIntervalMs, TimeUnit.MILLISECONDS
        );

        Runnable cancel = () -> {
            finished.set(true);
            future.cancel(true);
        };

        output.onCompletion(cancel);
        output.onError(err -> cancel.run());
        output.onTimeout(() -> {
            if (finished.compareAndSet(false, true)) {
                output.setResult(ResponseEntity.ok(List.of())); // timeout thì trả []
            }
            cancel.run();
        });

        return output;
    }
}