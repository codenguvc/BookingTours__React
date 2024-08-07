import { getDatabase, ref, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';

const deleteUsers = async (id, setUsers, users) => {
    const adminRoleId = '1722924944760';
    const userToDelete = users.find(user => user.id === id);

    if (userToDelete && userToDelete.role_id === adminRoleId) {
        Swal.fire({
            title: 'Không thể xoá',
            text: 'Người dùng có vai trò admin không thể bị xóa!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
        return;
    }

    Swal.fire({
        title: 'Bạn chắc chắn muốn xoá?',
        text: 'Nếu xoá sẽ mất đi dữ liệu!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Huỷ',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const db = getDatabase(app);
            const userRef = ref(db, `users/${id}`);
            try {
                await remove(userRef);
                setUsers(users.filter((user) => user.id !== id));
                Swal.fire('Xoá!', 'Đã xoá thành công!', 'success');
            } catch (error) {
                console.error('Error deleting data:', error);
                Swal.fire('Error!', 'Không thể xoá người dùng!', 'error');
            }
        }
    });
};

export default deleteUsers;
