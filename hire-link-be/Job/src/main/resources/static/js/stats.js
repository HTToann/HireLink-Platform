(function () {
    // Đảm bảo Chart.js đã có và dữ liệu đã sẵn sàng
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        const data = window.statsData || {
            employerCount: 0,
            applicantCount: 0,
            totalJobs: 0,
            jobsThisWeek: 0,
            jobsThisMonth: 0
        };

        // DOM refs
        const userBox = document.getElementById('userChartBox');
        const jobBox  = document.getElementById('jobChartBox');

        // Khởi tạo biểu đồ Người dùng (doughnut)
        const userCtx = document.getElementById('userTypeChart');
        const userTypeChart = new Chart(userCtx, {
            type: 'doughnut',
            data: {
                labels: ['Employer', 'Applicant'],
                datasets: [{
                    data: [data.employerCount, data.applicantCount],
                    backgroundColor: ['#00b894', '#0984e3'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1200,
                    easing: 'easeInOutCubic'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            boxWidth: 12,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.parsed}`
                        }
                    }
                }
            }
        });

        // Khởi tạo biểu đồ Công việc (bar)
        const jobCtx = document.getElementById('jobPostedChart');
        const jobPostedChart = new Chart(jobCtx, {
            type: 'bar',
            data: {
                labels: ['Tổng', '1 Tuần', '1 Tháng'],
                datasets: [{
                    label: 'Số lượng công việc',
                    data: [data.totalJobs, data.jobsThisWeek, data.jobsThisMonth],
                    backgroundColor: ['#6c5ce7', '#fd79a8', '#ffeaa7'],
                    borderWidth: 1,
                    barThickness: 80,
                    maxBarThickness: 100
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    x: {
                        ticks: { color: 'white' },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: 'white' },
                        beginAtZero: true,
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`
                        }
                    }
                }
            }
        });

        // Toggle giữa 2 biểu đồ
        function showChart(type) {
            userBox.style.display = (type === 'user') ? 'flex' : 'none';
            jobBox.style.display  = (type === 'job')  ? 'flex' : 'none';
        }

        // Gắn sự kiện vào các nút toggle
        document.querySelectorAll('[data-chart-target]').forEach(btn => {
            btn.addEventListener('click', () => showChart(btn.getAttribute('data-chart-target')));
        });

        // Mặc định hiển thị user chart
        showChart('user');
    });
})();
