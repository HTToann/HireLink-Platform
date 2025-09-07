document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo DataTable
    const table = $('#job-table').DataTable({
        language: {
            search: "🔍 Tìm kiếm:",
            lengthMenu: "Hiển thị _MENU_ dòng",
            info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
            paginate: { previous: "← Trước", next: "Tiếp →" }
        },
        // Tùy chọn thêm:
        // pageLength: 10,
        // order: [[0, 'asc']]
    });

    // Ô tìm kiếm tiêu đề (lọc theo cột 0)
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('keyup', function () {
            table.column(0).search(this.value).draw();
        });
    }
});
