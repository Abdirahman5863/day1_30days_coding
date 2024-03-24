import { useState } from 'react';
import ramadan from "./date";
import "./style.css"
const Accordian = () => {
    const [selected, setSelected] = useState(null);
    const [multiselected, setMultiselected] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(currentId) {
        setSelected(currentId);
    }

    function handleMultiselection(currentId) {
        setMultiple(prevMultiple => {
            const index = prevMultiple.indexOf(currentId);
            if (index === -1) {
                return [...prevMultiple, currentId];
            } else {
                let newMultiple = [...prevMultiple];
                newMultiple.splice(index, 1);
                return newMultiple;
            }
        });
    }

    return (
        <div className='wrapper'>
            <button onClick={() => setMultiselected(!multiselected)}>Multi Selection</button>
            <div className='accordian'>
                {ramadan && ramadan.length > 0 ? (
                    ramadan.map((ramadanItem) => (
                        <div className='ramadanItem' key={ramadanItem.id}>
                            <div
                                onClick={multiselected ? () => handleMultiselection(ramadanItem.id) :
                                    () => handleSingleSelection(ramadanItem.id)}
                                className='title'>
                                {ramadanItem.question}
                                <span>+</span>
                            </div>
                            {multiselected ? multiple.indexOf(ramadanItem.id) !== -1 &&
                                <div className='answer'>
                                    {ramadanItem.answer}
                                </div> :
                                selected === ramadanItem.id && (
                                    <div className='answer'>
                                        {ramadanItem.answer}
                                    </div>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <div>No Ramadan data</div>
                )}
            </div>
        </div>
    );
}

export default Accordian;
