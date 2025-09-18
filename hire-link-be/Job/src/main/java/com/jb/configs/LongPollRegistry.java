package com.jb.configs;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class LongPollRegistry<T> {

    private final ConcurrentHashMap<Long, List<DeferredResult<ResponseEntity<List<T>>>>> waitingMap = new ConcurrentHashMap<>();

    public void add(Long userId, DeferredResult<ResponseEntity<List<T>>> result) {
        waitingMap.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(result);

        // remove khi complete/timeout
        result.onCompletion(() -> remove(userId, result));
        result.onTimeout(() -> remove(userId, result));
        result.onError(err -> remove(userId, result));
    }

    public void publish(Long userId, List<T> data) {
        List<DeferredResult<ResponseEntity<List<T>>>> results = waitingMap.remove(userId);
        if (results != null) {
            for (DeferredResult<ResponseEntity<List<T>>> r : results) {
                r.setResult(ResponseEntity.ok(data));
            }
        }
    }

    private void remove(Long userId, DeferredResult<ResponseEntity<List<T>>> result) {
        List<DeferredResult<ResponseEntity<List<T>>>> results = waitingMap.get(userId);
        if (results != null) {
            results.remove(result);
            if (results.isEmpty()) {
                waitingMap.remove(userId);
            }
        }
    }
}
