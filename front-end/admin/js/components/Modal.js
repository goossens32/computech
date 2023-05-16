export default class Modal {

    // Modal de confirmación de insert
    static confirmInsert() {
        Swal.fire({
            title: 'Elemento insertado',
            text: 'Elemento insertado correctamente en la base de datos',
            icon: 'success',
            showCancelButton : false,
            confirmButtonText: 'Aceptar',
            customClass: {
                container: 'modal-container',
                popup: 'popup-container',
                confirmButton: 'modal-confirm-button',
                actions: 'modal-actions-container'
            },
            showClass: {
                popup: 'no-animation'
            }
        })
    }

    // Modal de confirmación para eliminar elemento
    static waringDelete() {
        Swal.fire ({
            title: 'Atención',
            text: 'Vas a eliminar un elemento de la base de datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'modal-container',
                popup: 'popup-container',
                confirmButton: 'modal-confirm-button',
                cancelButton: 'modal-cancel-button',
                actions: 'modal-actions-container'
            },
            showClass: {
                popup: 'no-animation'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Operación completada',
                    text: 'El elemento ha sido eliminado correctamente',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        container: 'modal-completed-container',
                        popup: 'popup-completed-container',
                        confirmButton: 'modal-confirmed-button',
                        actions: 'modal-confirmed-actions-container'
                    },
                    showClass: {
                        popup: 'no-animation'
                    }
                });
            }
        });
    }
}