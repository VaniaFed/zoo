window.onload = function() {
    const addItem = function() {
        console.log( createContainer() );
    }

    const createContainer = function() {
        const container = document.createElement('div');
        container.classList ='row row-item row-content';
        return container;
    }

    const btnDelete = document.querySelector('#addAnimal');

    $('#addAnimal').on('click', function(e) {
        e.preventDefault();
        addItem();
    });

    $('#changeAnimal').on('click', function(e) {
        e.preventDefault();
        let id = $('#id').val(),
            name = $('#name').val(),
            dailyFeed = $('#dailyFeed').val(),
            family = $('#family').val(),
            habitat = $('#habitat').val(),
            complex_id = $('#complex_id').val();

            $.post("/animals/change", {
                id,
                name,
                dailyFeed,
                family,
                habitat,
                complex_id
            }, function(data) {
                console.log(data);
            });
    });
}