// @flow
import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Form } from 'react-redux-form';
import { withI18n, Trans } from 'lingui-react';
import { isRequired } from 'util/Validator';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import { modelPath } from 'bundles/Story/modules/DashboardModule';
import './Dashboard.scss';

type Props = {
    action: FormProps,
    isPending: boolean,
    i18n: Object,
    onSubmitAction: (data: Object) => any,
    $form: FormProps,
    data: Array,
}

export const DashboardComponent = ({action, isPending, i18n, onSubmitAction, $form, data}: Props) => (
<Panel className="dashboard" header={i18n.t`AbsImm`}>
    {data.map((text, i) => <div key={i}>{text}</div>)}
<Form model={modelPath} onSubmit={data => onSubmitAction(data)} autoComplete="off">
    <FormControl
        id="action"
        formProps={action}
        controlProps={{
            type: 'input',
            placeholder: i18n.t`What do you want to do?`,
            maxLength: 255,
        }}
        validators={{
            isRequired,
        }}
    />
    <Button bsStyle="primary" type="submit" disabled={!$form.valid || isPending} block>
        {isPending ? <div><Spinner /> <Trans>Do it</Trans></div> : <Trans>Do it</Trans>}
    </Button>
</Form>
</Panel>
);

export default withI18n()(DashboardComponent);