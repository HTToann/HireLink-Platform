document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo DataTable
    const table = $('#job-table').DataTable({
        language: {
            search: "🔍 Tìm kiếm:",
            lengthMenu: "Hiển thị _MENU_ dòng",
            info: "",
            paginate: { previous: "← Trước", next: "Tiếp →" },
            pageLength: 10,
            order: [[0, 'asc']]
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
