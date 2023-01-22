import $ from "jquery";

const ButtonContainer = $('<div>', {
    id: 'button_container',
    css: {
        // position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '500px',
        height: '120px',
        
    }
})

const button = $('<div>', {
    css: {
        position: 'relative',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '3px solid black',
        backgroundColor: 'white'
    }
})

button.clone().appendTo(ButtonContainer).css({
    left: '60px',
})
button.clone().appendTo(ButtonContainer).css({
    left: '230px'
    
})

export default ButtonContainer;