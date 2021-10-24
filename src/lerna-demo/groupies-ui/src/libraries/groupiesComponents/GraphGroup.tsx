import * as React from 'react';

interface IGraphGroupProps {
    title: string;
    description: string;
}

export class GraphGroup extends React.Component<IGraphGroupProps, {}> {
    public render(): React.ReactElement<IGraphGroupProps> {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        );
    }
}