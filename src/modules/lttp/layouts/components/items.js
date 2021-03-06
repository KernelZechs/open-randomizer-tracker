import React from "react";
import PropTypes from "prop-types";
import {RootContext} from '../../../../context/RootContext';

export default class ModuleLayout_LinkToThePast_ItemsComponent extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        config:PropTypes.object.isRequired,
        triforce:PropTypes.bool,
        keysanity:PropTypes.bool
    };

    /** React PropType Defaults **/
    static defaultProps = {
        triforce:false,
        keysanity:false
    };

    static contextType = RootContext;
    config = null;

    /**
     * componentWillMount - Handles clearing the state and resetting it when the component will be mounted.
     * @return {void}
     */
    UNSAFE_componentWillMount() {
        this.config = this.context.config;
    }

    /**
     * Changes the style for progressive items such as tunics and swords. Handles counting down as well.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemRightClick = (key, item) => {

        const state = this.config.moduleState;

        let counter = 0;
        let active = state.items[key].active;

        if (item.counter) {

            counter = state.items[key].counter;
            counter -= 1;
            active = true;

            if (counter < 0) {
                counter += 1;
            }
            if (counter <= 0) {
                active = false;
            }

            state.items[key].active = active;
            state.items[key].counter = counter;
            

        } else if (item.progressive) {

            let level = state.items[key].level;
            level = level+1;

            if (level >= item.styles.length) {
                level = 0;
            }

            
            state.items[key].level = level;

        }

        this.config.moduleState = state;

        return false;

    }

    /**
     * Changes the active state of items, counter objects such as bottles are also handled.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemLeftClick = (key, item) => {

        const state = this.config.moduleState;

        let active = !state.items[key].active;
        let counter = 0;

        if (item.counter) {

            counter = state.items[key].counter;
            counter += 1;
            active = true;

            if (counter > item.counter) {
                counter -= 1;
            }

        }

        state.items[key].active = active;
        state.items[key].counter = counter;

        this.config.moduleState = state;
    }


    /**
     * Renders the item grid
     * @return {ReactDOM}
     */
    render() {

        const state = this.config.moduleState;

        const config = this.props.config;
        const elements = [];

        for (const key in config.items) {

            const item = config.items[key];
            let element = null;
            if (key === 'triforce' && !this.props.triforce) {
                element = <div key={key}/>;
            } else {
                element = this._renderItem(key, item, state);
            }
            
            elements.push(element);
        }

        let className = 'ort-lttp-items';
        if (this.props.keysanity) {
            className += ' keysanity';
        }

        return <div className={className}>
            {elements}
        </div>;
    }

    /**
     * Private function, Renders the item view and actions.
     * @param {string} key - Item Key
     * @param {object} item - Item properties
     * @param {object} state - The current state of this class
     * @return {ReactDOM}
     */
    _renderItem(key, item, state) {

        // Elements and Classes
        let icon = `${key}.png`;
        let elementCounter = null;
        let classInactive = '';

        // Actions
        let onClick = () => this.onItemLeftClick(key, item);
        let onRightClick = null;

        // State
        const {level, counter} = state.items[key];

        // If item is progressive, get the right icon per the style.
        if (item.progressive) {
            icon = `${key}/${item.styles[level]}.png`;
            onRightClick = () => this.onItemRightClick(key, item);
        }

        // If item is not active, gray it out.
        if (state.items[key].active === false && !item.required) {
            classInactive = 'inactive';
        }

        // If item is required, cannot be grayed out (tunic only)
        if (item.required) {
            onClick = null;
        }

        // If item has a counter, display the count (bottles only)
        if (item.counter) {
            if (counter > 0) {
                elementCounter = <span>{counter}</span>;
            }
            onRightClick = () => this.onItemRightClick(key, item);
        }

        // Assemble
        return <div key={key}>
            <img className={classInactive} onClick={onClick} onContextMenu={onRightClick} src={`resources/modules/lttp/items/${icon}`}/>
            {elementCounter}
        </div>;

    }

}
