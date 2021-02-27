import _ from 'lodash';
import { initPage } from './logic.js';
import './styles.css';

initPage();


if (module.hot) {
    module.hot.accept('./layout.js', function() {
        console.log('Accepting the updated sidebar module!');
        document.body.removeChild(sidebar);
        sidebar = createSidebar();
        document.body.appendChild(sidebar);
    })
}