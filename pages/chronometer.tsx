import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ChronometerLaps, Timer, TimerButton, PageContent, Toggleable } from 'components';
import { State } from 'src/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { actions } from 'src/redux/modules/chronometer';

type ChronometerPageProps = StateToProps & DispatchToProps;

export class ChronometerPage extends Component<ChronometerPageProps> {
  render() {
    const { chronometer, laps, start, stop } = this.props;

    // TODO: move reset to Timer and expose some props related to it

    return (
      <PageContent className="-chronometer">
        <Toggleable>
          {({ active: expanded, toggle }) => (
            <>
              <Timer
                expanded={expanded}
                noInfo
                showHundredths
                time={chronometer}
                onClickStart={start}
                onClickPause={stop}
                onClickToggleExpansion={toggle}
                renderActions={() => (
                  <>
                    <TimerButton
                      icon="reset"
                      title="Reset"
                      hideButton={this.isResetHidden()}
                      onClick={this.reset}
                    />

                    <TimerButton
                      icon="flag"
                      title="Laps"
                      hideButton={this.isLapsHidden()}
                      onClick={this.registerLap}
                    />
                  </>
                )}
              >
                {!!expanded && <ChronometerLaps laps={laps} />}
              </Timer>

              {!expanded && <ChronometerLaps laps={laps} />}
            </>
          )}
        </Toggleable>
      </PageContent>
    );
  }

  isResetHidden = () => {
    const { milliseconds, paused } = this.props.chronometer;
    return !paused || milliseconds === 0;
  }

  isLapsHidden = () => this.props.chronometer.paused;

  registerLap = () => {
    const { chronometer, registerLap } = this.props;
    registerLap(chronometer.milliseconds);
  }

  reset = () => {
    this.props.reset();
    this.props.removeLaps();
  }
}

type StateToProps = ReturnType<typeof mapStateToProps>;
type DispatchToProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = ({ chronometer, laps }: State) => ({
  chronometer,
  laps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChronometerPage);
