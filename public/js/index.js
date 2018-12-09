window.onload = function() {
    $('#addSubmitAnimal').on('click', function(e) {
        e.preventDefault();
        let name = $('#name').val(),
            dailyFeed = $('#dailyFeed').val(),
            family = $('#family').val(),
            habitat = $('#habitat').val(),
            complex_id = $('#complex_id').val();

            $.post("/animals/create/", {
                name,
                dailyFeed,
                family,
                habitat,
                complex_id
            }, function(data) {
                console.log(data);
            });
    });

    $('#addSubmitComplex').on('click', function(e) {
        e.preventDefault();
        let name = $('#name').val(),
            heating = $('#heating').val(),
            reservoir = $('#reservoir').val();
        
        if (heating == 'Да') {
            heating = 1;
        }

        if (reservoir == 'Да') {
            reservoir = 1;
        }

        $.post("/complex/create/", {
            name,
            heating,
            reservoir
        }, function(data) {
            console.log(data);
        });
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

    $('#changeComplex').on('click', function(e) {
        e.preventDefault();
        let id = $('#id').val(),
            name = $('#name').val(),
            heating = $('#heating').val(),
            reservoir = $('#reservoir').val();


        $.post("/complex/change", {
            id,
            name,
            heating,
            reservoir
        }, function(data) {
            console.log(data);
        });
    });
}