import React from 'react';
import {RootContext} from '../../context/RootContext';
import {HeaderSidebarPrimary, HeaderSidebarSecondary, HeaderSidebarSubsection} from '../../components/basic/header'
import Container from '../../components/basic/container'
import Select from '../../components/basic/input/select'
import Button from '../../components/basic/button'

import "./index.sass";

export default class ConfigView extends React.Component {
    static contextType = RootContext;

    render() {
        return <div className='ort-sidebar-profile'>

            <HeaderSidebarPrimary>Configuration</HeaderSidebarPrimary>

            <div className='ort-sidebar-profile-content'>

                <HeaderSidebarSecondary>Module</HeaderSidebarSecondary>

                    <Container>
                        <strong>Module:</strong>
                    </Container>
                    <Container>
                        <Select/>
                    </Container>
                     <Container>
                        <div><strong>Layout:</strong></div>
                    </Container>
                    <Container final>
                        <Select/>
                    </Container>

                <HeaderSidebarSecondary>Options</HeaderSidebarSecondary>
                    <Container>
                        <strong>Background Color</strong>
                    </Container>
                    <Container>
                        <strong>Always On Top</strong>
                    </Container>
                    <Container final>
                        <strong>Zoom Level</strong>
                    </Container>

            </div>
        </div>;
    }
}