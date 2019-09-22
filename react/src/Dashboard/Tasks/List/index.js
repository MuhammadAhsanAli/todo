import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import Table from './Table/';


const List = (props) => {
    return (
        <Fragment>
            <PageTitle
                heading="Tasks"
                subheading="List of the all tasks."
                icon="pe-7s-eyedropper icon-gradient bg-happy-itmeo"
            />
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Task List</CardTitle>
                                <Table/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

export default List;
