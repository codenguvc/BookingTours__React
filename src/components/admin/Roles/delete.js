import { getDatabase, ref, remove, get, query, orderByChild, equalTo } from 'firebase/database';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';

const deleteRoles = async (id, setRoles, roles) => {
    const db = getDatabase(app);
    const usersRef = ref(db, 'users');
    const usersWithRoleQuery = query(usersRef, orderByChild('role_id'), equalTo(id));

    try {
        const usersSnapshot = await get(usersWithRoleQuery);
        if (usersSnapshot.exists()) {
            Swal.fire({
                title: 'Không thể xoá vai trò!',
                text: 'Vui lòng xoá người dùng có vai trò này trước.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
            return;
        }
    } catch (error) {
        console.error('Error checking users with role:', error);
        Swal.fire('Error!', 'Không thể kiểm tra vai trò!', 'error');
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
            const roleRef = ref(db, `roles/${id}`);
            try {
                await remove(roleRef);
                setRoles(roles.filter((role) => role.id !== id));
                Swal.fire('Xoá!', 'Đã xoá thành công!', 'success');
            } catch (error) {
                console.error('Error deleting data:', error);
                Swal.fire('Error!', 'Không thể xoá vai trò!', 'error');
            }
        }
    });
};

export default deleteRoles;
