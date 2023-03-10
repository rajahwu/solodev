import $ from "jquery";

const PicContainer = $('<div>', {
    css: {
        width: '250px',
        height: '250px',
        border: '5px solid black',
        borderRadius: '15px',
        marginTop: '25px'
    }
})

$('<img>', {
    id: 'catImage',
    width: '250px',
    height: '250px',
    css: { borderRadius: '15px' },
    click: function () {
        $.get('https://api.thecatapi.com/v1/images/search', (response) => {
            $('#catImage').attr({
                src: response[0].url,
            });
        })
    }
}).appendTo(PicContainer);

export default PicContainer;