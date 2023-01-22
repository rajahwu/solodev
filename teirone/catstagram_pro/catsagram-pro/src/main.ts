import './style.css';
import $ from "jquery";
import { AppContainer, PicContainer, CommentContainer } from './components';

$(() => {
    const app = $('#app');
    app.append(AppContainer);
    AppContainer.append(PicContainer);
    AppContainer.append(CommentContainer);
})



