import $ from "jquery";
import Comment from "./comment";

const CommentContainer = $('<div>', {
    css: {
        width: '200px',
        height: '200px',
        border: '5px solid black',
        marginTop: '5vh',
        borderRadius: '15px',
        backgroundColor: 'pink'
    },
    click: () => $('#comments').append(Comment.clone())
})
    CommentContainer.append($('<ul>', {
        id: 'comments',
        css: {
            listStyle: 'none',
            padding: '0',
            
        }
    }))

export default CommentContainer;