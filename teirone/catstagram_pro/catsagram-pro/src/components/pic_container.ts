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

$('<img>').appendTo(PicContainer);

export default PicContainer;