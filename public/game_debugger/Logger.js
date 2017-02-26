const LOGGING_LEVEL = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  ALL: 4
};

class Logger {
  constructor() {
    this.loggingLevel = LOGGING_LEVEL.INFO;
    this.infoEventFilter = null;

    EventHandler.getInstance().setLogger(this);

    window.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
      this._handleEvent(LOGGING_LEVEL.ERROR, errorMsg, errorObj);
      return true;
    };
  }

  setLoggingLevel(loggingLevel) {
    this.loggingLevel = loggingLevel;
  }

  setInfoEventFilter(infoEventFilter){
    this.infoEventFilter = infoEventFilter.toLowerCase();
  }

  _handleEvent(loggingLevel, information, informationObject) {
    if (loggingLevel <= this.loggingLevel) {
      switch (loggingLevel) {
        case 1:
          this.prettyPrintError(information, informationObject);
          break;
        case 3:
          if (information.toLocaleLowerCase().includes(this.infoEventFilter))
            this.prettyPrintInfo(information, informationObject);
          break;
        default:
          this.prettyPrint(information, console.log, informationObject);
          break;
      }
    }
  }

  error(errorMsg, errorObj) {
    this._handleEvent(LOGGING_LEVEL.ERROR, errorMsg, errorObj);
  }

  warn(warning) {
    this._handleEvent(LOGGING_LEVEL.WARN, warning);
  }

  info(event, object, reason, subscribers) {
    this._handleEvent(LOGGING_LEVEL.INFO, event, {sender: object, reason: reason, subscribers: subscribers});
  }

  async prettyPrintError(errorMessage, stackTrace) {
    console.error(
      '%cRocketX Error Report:\n', 'font-size: 20px',
      'Error: ', errorMessage, '\n',
      'Stack Trace: ', stackTrace, '\n\n',
      'State of the memory before the error:\n',
      '--Current frame: ', TimeHandler.getInstance().getCurrentFrameIndex(), '\n',
      '--Player: ', framework.getEntities()[0], '\n',
      '--Entities in the memory: ', framework.getEntities(), '\n',
      '--Scheduled Frame Events: ', TimeHandler.getInstance()._frameEvents,
      '\n\nTips to solve the problem:', await TipsContainer.getInstance().getTips(stackTrace.stack.toString()),
      '\n\nUse the step() command to restart the framework event loop, after you fixed the bug.');
  }

  prettyPrintInfo(eventName, eventInformation){
      console.info(
        eventName, 'event happened:\n',
        '--Sender: ', eventInformation.sender, '\n',
        '--Reason: ', eventInformation.reason, '\n',
        '--Subscribers to this event:', eventInformation.subscribers
      );
  }

  prettyPrint(information, output, object) {
    if (object)
      output('RocketX Logger:\n', information, '\n', object);
    else
      output('RocketX Logger:\n', information);
  }
}
