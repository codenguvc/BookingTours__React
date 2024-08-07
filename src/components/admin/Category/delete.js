import { getDatabase, ref, remove, get } from 'firebase/database';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';

const deleteCategory = async (id, setCategories, categories) => {
  const db = getDatabase(app);
  const checkProductsRef = ref(db, 'products');
  const categoryRef = ref(db, `categories/${id}`);

  try {
    const snapshot = await get(checkProductsRef);
    const products = snapshot.val();
    const isCategoryUsed = Object.values(products).some(product => product.category === id);
    if (isCategoryUsed) {
      Swal.fire({
        title: 'Danh mục đang được sử dụng!',
        text: 'Danh mục này không thể bị xóa vì nó đang được sử dụng trong sản phẩm.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return;
    }
    await remove(categoryRef);
    setCategories(categories.filter(category => category.id !== id));
    Swal.fire('Xoá!', 'Danh mục đã được xóa thành công!', 'success');
  } catch (error) {
    console.error('Error deleting data:', error);
    Swal.fire('Error!', 'Không thể xóa danh mục!', 'error');
  }
};

export default deleteCategory;
