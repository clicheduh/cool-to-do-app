$(document).ready(() => {
    $('form').on('submit', () => {
        var todoInput = $('#todo-input');
        var newTodo = { item: todoInput.val() };

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: newTodo,
            success: (data) => {
                location.reload();
            }
        });
        return false;
    });

    $('li').on('click', (event) => {
        var item = event.target.innerHTML.replace(/ /g, '-');

        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: (data) => {
                location.reload();
            }
        });
        return false;
    });
});
