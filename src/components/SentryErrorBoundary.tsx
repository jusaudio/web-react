import * as React from "react";
import * as Sentry from "@sentry/browser";

export default class ExampleBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    if (this.state.error) {
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    } else {
      return this.props.children;
    }
  }
}
