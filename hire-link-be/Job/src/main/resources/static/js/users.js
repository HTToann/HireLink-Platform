document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo DataTable
    const table = $('#user-table').DataTable({
        language: {
            search: "🔍 Tìm kiếm:",
            lengthMenu: "Hiển thị _MENU_ dòng",
            info: "",
            paginate: { previous: "← Trước", next: "Tiếp →" },
            pageLength: 10,
            order: [[0, 'asc']]
        },
        // pageLength: 10,
        // order: [[0, 'asc']]
    });

    // Lọc theo tên (cột 0)
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('keyup', function () {
            table.column(0).search(this.value).draw();
        });
    }

    // Sửa người dùng: đổ dữ liệu vào form modal
    $(document).on('click', '.btn-edit', function () {
        const $btn = $(this);
        $('#userModal input[name="id"]').val($btn.data('id'));
        $('#userModal input[name="name"]').val($btn.data('name'));
        $('#userModal input[name="email"]').val($btn.data('email'));
        $('#userModal select[name="accountType"]').val($btn.data('accounttype'));
        $('#userModal input[name="password"]').val('');
        $('#userModalLabel').text('✏️ Chỉnh sửa người dùng');
        // Modal đã có data-bs-target nên không cần gọi .modal('show') nếu dùng Bootstrap 5 data API.
    });

    // Thêm người dùng: reset form
    const btnAdd = document.getElementById('btnAddUser');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const form = document.querySelector('#userModal form');
            if (form) form.reset();
            $('#userModal input[name="id"]').val('');
            $('#userModalLabel').text('➕ Thêm người dùng');
        });
    }
});
