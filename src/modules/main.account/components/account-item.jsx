import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import './account-item.css';

const AccountItem = props => (
    <div className={"row AccountItem" +
        (props.realPath === ('/main/account/' + props.pathName) ? ' account-menu-item-selected' : '')}
        onClick={props.onClick}>
        <div className="col-1 align-self-center">
            <i className={props.icon}></i>
        </div>
        <div className="col-10 align-self-center">
            <DisplayLabel
                textType={textTypes.DISPLAY_NORMAL}
                text={props.text} />
        </div>
    </div>
);

export default AccountItem;