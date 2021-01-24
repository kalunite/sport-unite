import React from 'react';

const SelectMatch = (props) => {
    const getNameStage = (stage) => {
        switch (stage) {
            case 'ROUND_OF_16':
                return '16 Besar';
            case 'QUARTER_FINALS':
                return 'Perempat Final';
            case 'SEMI_FINALS':
                return 'Semi Final';
            case '3RD_PLACE':
                return 'Tempat ke-3';
            case 'FINAL':
                return 'Final';
            default:
                return stage;
        };
    };
    const getOption = () => {
        if (props.type === 'league') {
            return (
                new Array((props.teamsData.length - 1) * 2).fill(undefined).map((t, i) =>
                    <option key={i} value={i + 1}>{i + 1}</option>
                )
            );
        } else {
            return (
                props.stages.map((stage, index) => {
                    if (stage === 'GROUP_STAGE') {
                        return new Array((Math.round(props.teamsData.length / props.groupLength) - 1) * props.legs).fill('Grup ke-').map((t, i) =>
                            <option key={i} value={`${stage} - ${i + 1}`}>{t} {i + 1}</option>
                        )
                    } else {
                        return <option key={index} value={`${stage} - ${null}`}>{getNameStage(stage)}</option>
                    };
                })
            );
        };
    };
    return (
        <h3 className="detail">Pertandingan {props.type === 'league' ? ' Pekan ke-' : 'Babak'}
            <select name="week" defaultValue={props.type === 'league' ? props.matchday : `GROUP_STAGE - ${props.matchday}`} onChange={props.changeMatchday}>
                <optgroup label="Pekan Ini">
                    <option value={props.type === 'league' ? props.matchday : `GROUP_STAGE - ${props.matchday}`}>
                        {props.type === 'league' || props.matchday === null ? props.matchday : `Grup ke- ${props.matchday}`}
                    </option>
                </optgroup>
                <optgroup label="Pekan ke-">{getOption()}</optgroup>
            </select>
        </h3>
    );
};

export default SelectMatch;