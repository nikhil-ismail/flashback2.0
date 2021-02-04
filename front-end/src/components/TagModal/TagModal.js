import React from 'react';

const TagModal = (props) => {
    const who = props.who;
    const where = props.where;
    const when = props.when;
    const what = props.what;

    return (
        <div>
            <div className="details">
                {who && <p className="fact">{who}</p>}
                {where && <p className="fact">{where}</p>}
                {when && <p className="fact">{when}</p>}
                {what && <p className="fact">{what}</p>}
            </div>
            <div className="love-close-btns">
                <p className="love-edit" onClick={props.handleEdit}>Edit</p>
            </div>
        </div>
    );
}

export default TagModal;