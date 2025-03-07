import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { createStore } from 'redux';
import { findDOMNode } from 'react-dom';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var LOAD_START = 'video-react/LOAD_START';
var CAN_PLAY = 'video-react/CAN_PLAY';
var WAITING = 'video-react/WAITING';
var CAN_PLAY_THROUGH = 'video-react/CAN_PLAY_THROUGH';
var PLAYING = 'video-react/PLAYING';
var PLAY = 'video-react/PLAY';
var PAUSE = 'video-react/PAUSE';
var END = 'video-react/END';
var SEEKING = 'video-react/SEEKING';
var SEEKED = 'video-react/SEEKED';
var SEEKING_TIME = 'video-react/SEEKING_TIME';
var END_SEEKING = 'video-react/END_SEEKING';
var DURATION_CHANGE = 'video-react/DURATION_CHANGE';
var TIME_UPDATE = 'video-react/TIME_UPDATE';
var VOLUME_CHANGE = 'video-react/VOLUME_CHANGE';
var PROGRESS_CHANGE = 'video-react/PROGRESS_CHANGE';
var RATE_CHANGE = 'video-react/RATE_CHANGE';
var SUSPEND = 'video-react/SUSPEND';
var ABORT = 'video-react/ABORT';
var EMPTIED = 'video-react/EMPTIED';
var STALLED = 'video-react/STALLED';
var LOADED_META_DATA = 'video-react/LOADED_META_DATA';
var LOADED_DATA = 'video-react/LOADED_DATA';
var RESIZE = 'video-react/RESIZE';
var ERROR = 'video-react/ERROR';
function handleLoadStart(videoProps) {
  return {
    type: LOAD_START,
    videoProps: videoProps
  };
}
function handleCanPlay(videoProps) {
  return {
    type: CAN_PLAY,
    videoProps: videoProps
  };
}
function handleWaiting(videoProps) {
  return {
    type: WAITING,
    videoProps: videoProps
  };
}
function handleCanPlayThrough(videoProps) {
  return {
    type: CAN_PLAY_THROUGH,
    videoProps: videoProps
  };
}
function handlePlaying(videoProps) {
  return {
    type: PLAYING,
    videoProps: videoProps
  };
}
function handlePlay(videoProps) {
  return {
    type: PLAY,
    videoProps: videoProps
  };
}
function handlePause(videoProps) {
  return {
    type: PAUSE,
    videoProps: videoProps
  };
}
function handleEnd(videoProps) {
  return {
    type: END,
    videoProps: videoProps
  };
}
function handleSeeking(videoProps) {
  return {
    type: SEEKING,
    videoProps: videoProps
  };
}
function handleSeeked(videoProps) {
  return {
    type: SEEKED,
    videoProps: videoProps
  };
}
function handleDurationChange(videoProps) {
  return {
    type: DURATION_CHANGE,
    videoProps: videoProps
  };
}
function handleTimeUpdate(videoProps) {
  return {
    type: TIME_UPDATE,
    videoProps: videoProps
  };
}
function handleVolumeChange(videoProps) {
  return {
    type: VOLUME_CHANGE,
    videoProps: videoProps
  };
}
function handleProgressChange(videoProps) {
  return {
    type: PROGRESS_CHANGE,
    videoProps: videoProps
  };
}
function handleRateChange(videoProps) {
  return {
    type: RATE_CHANGE,
    videoProps: videoProps
  };
}
function handleSuspend(videoProps) {
  return {
    type: SUSPEND,
    videoProps: videoProps
  };
}
function handleAbort(videoProps) {
  return {
    type: ABORT,
    videoProps: videoProps
  };
}
function handleEmptied(videoProps) {
  return {
    type: EMPTIED,
    videoProps: videoProps
  };
}
function handleStalled(videoProps) {
  return {
    type: STALLED,
    videoProps: videoProps
  };
}
function handleLoadedMetaData(videoProps) {
  return {
    type: LOADED_META_DATA,
    videoProps: videoProps
  };
}
function handleLoadedData(videoProps) {
  return {
    type: LOADED_DATA,
    videoProps: videoProps
  };
}
function handleResize(videoProps) {
  return {
    type: RESIZE,
    videoProps: videoProps
  };
}
function handleError(videoProps) {
  return {
    type: ERROR,
    videoProps: videoProps
  };
}
function handleSeekingTime(time) {
  return {
    type: SEEKING_TIME,
    time: time
  };
}
function handleEndSeeking(time) {
  return {
    type: END_SEEKING,
    time: time
  };
}

var videoActions = /*#__PURE__*/Object.freeze({
  LOAD_START: LOAD_START,
  CAN_PLAY: CAN_PLAY,
  WAITING: WAITING,
  CAN_PLAY_THROUGH: CAN_PLAY_THROUGH,
  PLAYING: PLAYING,
  PLAY: PLAY,
  PAUSE: PAUSE,
  END: END,
  SEEKING: SEEKING,
  SEEKED: SEEKED,
  SEEKING_TIME: SEEKING_TIME,
  END_SEEKING: END_SEEKING,
  DURATION_CHANGE: DURATION_CHANGE,
  TIME_UPDATE: TIME_UPDATE,
  VOLUME_CHANGE: VOLUME_CHANGE,
  PROGRESS_CHANGE: PROGRESS_CHANGE,
  RATE_CHANGE: RATE_CHANGE,
  SUSPEND: SUSPEND,
  ABORT: ABORT,
  EMPTIED: EMPTIED,
  STALLED: STALLED,
  LOADED_META_DATA: LOADED_META_DATA,
  LOADED_DATA: LOADED_DATA,
  RESIZE: RESIZE,
  ERROR: ERROR,
  handleLoadStart: handleLoadStart,
  handleCanPlay: handleCanPlay,
  handleWaiting: handleWaiting,
  handleCanPlayThrough: handleCanPlayThrough,
  handlePlaying: handlePlaying,
  handlePlay: handlePlay,
  handlePause: handlePause,
  handleEnd: handleEnd,
  handleSeeking: handleSeeking,
  handleSeeked: handleSeeked,
  handleDurationChange: handleDurationChange,
  handleTimeUpdate: handleTimeUpdate,
  handleVolumeChange: handleVolumeChange,
  handleProgressChange: handleProgressChange,
  handleRateChange: handleRateChange,
  handleSuspend: handleSuspend,
  handleAbort: handleAbort,
  handleEmptied: handleEmptied,
  handleStalled: handleStalled,
  handleLoadedMetaData: handleLoadedMetaData,
  handleLoadedData: handleLoadedData,
  handleResize: handleResize,
  handleError: handleError,
  handleSeekingTime: handleSeekingTime,
  handleEndSeeking: handleEndSeeking
});

var Fullscreen =
/*#__PURE__*/
function () {
  function Fullscreen() {}

  var _proto = Fullscreen.prototype;

  _proto.request = function request(elm) {
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitRequestFullscreen) {
      elm.webkitRequestFullscreen();
    } else if (elm.mozRequestFullScreen) {
      elm.mozRequestFullScreen();
    } else if (elm.msRequestFullscreen) {
      elm.msRequestFullscreen();
    }
  };

  _proto.exit = function exit() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  _proto.addEventListener = function addEventListener(handler) {
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    document.addEventListener('mozfullscreenchange', handler);
    document.addEventListener('MSFullscreenChange', handler);
  };

  _proto.removeEventListener = function removeEventListener(handler) {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
    document.removeEventListener('mozfullscreenchange', handler);
    document.removeEventListener('MSFullscreenChange', handler);
  };

  _createClass(Fullscreen, [{
    key: "isFullscreen",
    get: function get() {
      return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }
  }, {
    key: "enabled",
    get: function get() {
      return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
    }
  }]);

  return Fullscreen;
}();

var fullscreen = new Fullscreen();

var OPERATE = 'video-react/OPERATE';
var FULLSCREEN_CHANGE = 'video-react/FULLSCREEN_CHANGE';
var PLAYER_ACTIVATE = 'video-react/PLAYER_ACTIVATE';
var USER_ACTIVATE = 'video-react/USER_ACTIVATE';
function handleFullscreenChange(isFullscreen) {
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: isFullscreen
  };
}
function activate(activity) {
  return {
    type: PLAYER_ACTIVATE,
    activity: activity
  };
}
function userActivate(activity) {
  return {
    type: USER_ACTIVATE,
    activity: activity
  };
}
function play(operation) {
  if (operation === void 0) {
    operation = {
      action: 'play',
      source: ''
    };
  }

  this.video.play();
  return {
    type: OPERATE,
    operation: operation
  };
}
function pause(operation) {
  if (operation === void 0) {
    operation = {
      action: 'pause',
      source: ''
    };
  }

  this.video.pause();
  return {
    type: OPERATE,
    operation: operation
  };
}
function togglePlay(operation) {
  if (operation === void 0) {
    operation = {
      action: 'toggle-play',
      source: ''
    };
  }

  this.video.togglePlay();
  return {
    type: OPERATE,
    operation: operation
  };
} // seek video by time

function seek(time, operation) {
  if (operation === void 0) {
    operation = {
      action: 'seek',
      source: ''
    };
  }

  this.video.seek(time);
  return {
    type: OPERATE,
    operation: operation
  };
} // jump forward x seconds

function forward(seconds, operation) {
  if (operation === void 0) {
    operation = {
      action: "forward-" + seconds,
      source: ''
    };
  }

  this.video.forward(seconds);
  return {
    type: OPERATE,
    operation: operation
  };
} // jump back x seconds

function replay(seconds, operation) {
  if (operation === void 0) {
    operation = {
      action: "replay-" + seconds,
      source: ''
    };
  }

  this.video.replay(seconds);
  return {
    type: OPERATE,
    operation: operation
  };
}
function changeRate(rate, operation) {
  if (operation === void 0) {
    operation = {
      action: 'change-rate',
      source: ''
    };
  }

  this.video.playbackRate = rate;
  return {
    type: OPERATE,
    operation: operation
  };
}
function changeVolume(volume, operation) {
  if (operation === void 0) {
    operation = {
      action: 'change-volume',
      source: ''
    };
  }

  var v = volume;

  if (volume < 0) {
    v = 0;
  }

  if (volume > 1) {
    v = 1;
  }

  this.video.volume = v;
  return {
    type: OPERATE,
    operation: operation
  };
}
function mute(muted, operation) {
  if (operation === void 0) {
    operation = {
      action: muted ? 'muted' : 'unmuted',
      source: ''
    };
  }

  this.video.muted = muted;
  return {
    type: OPERATE,
    operation: operation
  };
}
function toggleFullscreen(player) {
  if (fullscreen.enabled) {
    if (fullscreen.isFullscreen) {
      fullscreen.exit();
    } else {
      fullscreen.request(this.rootElement);
    }

    return {
      type: OPERATE,
      operation: {
        action: 'toggle-fullscreen',
        source: ''
      }
    };
  }

  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen
  };
}

var playerActions = /*#__PURE__*/Object.freeze({
  OPERATE: OPERATE,
  FULLSCREEN_CHANGE: FULLSCREEN_CHANGE,
  PLAYER_ACTIVATE: PLAYER_ACTIVATE,
  USER_ACTIVATE: USER_ACTIVATE,
  handleFullscreenChange: handleFullscreenChange,
  activate: activate,
  userActivate: userActivate,
  play: play,
  pause: pause,
  togglePlay: togglePlay,
  seek: seek,
  forward: forward,
  replay: replay,
  changeRate: changeRate,
  changeVolume: changeVolume,
  mute: mute,
  toggleFullscreen: toggleFullscreen
});

var initialState = {
  currentSrc: null,
  duration: 0,
  currentTime: 0,
  seekingTime: 0,
  buffered: null,
  waiting: false,
  seeking: false,
  paused: true,
  autoPaused: false,
  ended: false,
  playbackRate: 1,
  muted: false,
  volume: 1,
  readyState: 0,
  networkState: 0,
  videoWidth: 0,
  videoHeight: 0,
  hasStarted: false,
  userActivity: true,
  isActive: false,
  isFullscreen: false
};
function player(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case USER_ACTIVATE:
      return _extends({}, state, {
        userActivity: action.activity
      });

    case PLAYER_ACTIVATE:
      return _extends({}, state, {
        isActive: action.activity
      });

    case FULLSCREEN_CHANGE:
      return _extends({}, state, {
        isFullscreen: !!action.isFullscreen
      });

    case SEEKING_TIME:
      return _extends({}, state, {
        seekingTime: action.time
      });

    case END_SEEKING:
      return _extends({}, state, {
        seekingTime: 0
      });

    case LOAD_START:
      return _extends({}, state, action.videoProps, {
        hasStarted: false,
        ended: false
      });

    case CAN_PLAY:
      return _extends({}, state, action.videoProps, {
        waiting: false
      });

    case WAITING:
      return _extends({}, state, action.videoProps, {
        waiting: true
      });

    case CAN_PLAY_THROUGH:
    case PLAYING:
      return _extends({}, state, action.videoProps, {
        waiting: false
      });

    case PLAY:
      return _extends({}, state, action.videoProps, {
        ended: false,
        paused: false,
        autoPaused: false,
        waiting: false,
        hasStarted: true
      });

    case PAUSE:
      return _extends({}, state, action.videoProps, {
        paused: true
      });

    case END:
      return _extends({}, state, action.videoProps, {
        ended: true
      });

    case SEEKING:
      return _extends({}, state, action.videoProps, {
        seeking: true
      });

    case SEEKED:
      return _extends({}, state, action.videoProps, {
        seeking: false
      });

    case ERROR:
      return _extends({}, state, action.videoProps, {
        error: 'UNKNOWN ERROR',
        ended: true
      });

    case DURATION_CHANGE:
    case TIME_UPDATE:
    case VOLUME_CHANGE:
    case PROGRESS_CHANGE:
    case RATE_CHANGE:
    case SUSPEND:
    case ABORT:
    case EMPTIED:
    case STALLED:
    case LOADED_META_DATA:
    case LOADED_DATA:
    case RESIZE:
      return _extends({}, state, action.videoProps);

    default:
      return state;
  }
}

var initialState$1 = {
  count: 0,
  operation: {
    action: '',
    source: ''
  }
};
function operation(state, action) {
  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case OPERATE:
      return _extends({}, state, {
        count: state.count + 1,
        operation: _extends({}, state.operation, action.operation)
      });

    default:
      return state;
  }
}

function reducer (state, action) {
  if (state === void 0) {
    state = {};
  }

  return {
    player: player(state.player, action),
    operation: operation(state.operation, action)
  };
}
var playerReducer = player;
var operationReducer = operation;

var Manager =
/*#__PURE__*/
function () {
  function Manager(store) {
    this.store = store || createStore(reducer);
    this.video = null;
    this.rootElement = null;
  }

  var _proto = Manager.prototype;

  _proto.getActions = function getActions() {
    var manager = this;
    var dispatch = this.store.dispatch;

    var actions = _extends({}, playerActions, videoActions);

    function bindActionCreator(actionCreator) {
      return function bindAction() {
        // eslint-disable-next-line prefer-rest-params
        var action = actionCreator.apply(manager, arguments);

        if (typeof action !== 'undefined') {
          dispatch(action);
        }
      };
    }

    return Object.keys(actions).filter(function (key) {
      return typeof actions[key] === 'function';
    }).reduce(function (boundActions, key) {
      boundActions[key] = bindActionCreator(actions[key]);
      return boundActions;
    }, {});
  };

  _proto.getState = function getState() {
    return this.store.getState();
  } // subscribe state change
  ;

  _proto.subscribeToStateChange = function subscribeToStateChange(listener, getState) {
    if (!getState) {
      getState = this.getState.bind(this);
    }

    var prevState = getState();

    var handleChange = function handleChange() {
      var state = getState();

      if (state === prevState) {
        return;
      }

      var prevStateCopy = prevState;
      prevState = state;
      listener(state, prevStateCopy);
    };

    return this.store.subscribe(handleChange);
  } // subscribe to operation state change
  ;

  _proto.subscribeToOperationStateChange = function subscribeToOperationStateChange(listener) {
    var _this = this;

    return this.subscribeToStateChange(listener, function () {
      return _this.getState().operation;
    });
  } // subscribe to player state change
  ;

  _proto.subscribeToPlayerStateChange = function subscribeToPlayerStateChange(listener) {
    var _this2 = this;

    return this.subscribeToStateChange(listener, function () {
      return _this2.getState().player;
    });
  };

  return Manager;
}();

var propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  position: PropTypes.string,
  className: PropTypes.string
};
var defaultProps = {
  position: 'left'
};

var BigPlayButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(BigPlayButton, _Component);

  function BigPlayButton(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = BigPlayButton.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.handleClick = function handleClick() {
    var actions = this.props.actions;
    actions.play();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        player = _this$props.player,
        position = _this$props.position;
    return React.createElement("button", {
      className: classNames('video-react-big-play-button', "video-react-big-play-button-" + position, this.props.className, {
        'big-play-button-hide': player.hasStarted || !player.currentSrc
      }),
      type: "button",
      "aria-live": "polite",
      tabIndex: "0",
      onClick: this.handleClick
    }, React.createElement("span", {
      className: "video-react-control-text"
    }, "Play Video"));
  };

  return BigPlayButton;
}(Component);
BigPlayButton.propTypes = propTypes;
BigPlayButton.defaultProps = defaultProps;
BigPlayButton.displayName = 'BigPlayButton';

var propTypes$1 = {
  player: PropTypes.object,
  className: PropTypes.string
};
function LoadingSpinner(_ref) {
  var player = _ref.player,
      className = _ref.className;

  if (player.error) {
    return null;
  }

  return React.createElement("div", {
    className: classNames('video-react-loading-spinner', className)
  });
}
LoadingSpinner.propTypes = propTypes$1;
LoadingSpinner.displayName = 'LoadingSpinner';

var propTypes$2 = {
  poster: PropTypes.string,
  player: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string
};

function PosterImage(_ref) {
  var poster = _ref.poster,
      player = _ref.player,
      actions = _ref.actions,
      className = _ref.className;

  if (!poster || player.hasStarted) {
    return null;
  }

  return React.createElement("div", {
    className: classNames('video-react-poster', className),
    style: {
      backgroundImage: "url(\"" + poster + "\")"
    },
    onClick: function onClick() {
      if (player.paused) {
        actions.play();
      }
    }
  });
}

PosterImage.propTypes = propTypes$2;
PosterImage.displayName = 'PosterImage';

// eslint-disable-next-line no-self-compare

var isNaN = Number.isNaN || function (value) {
  return value !== value;
};
/**
 * @file format-time.js
 *
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 *
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 * @function formatTime
 */


function formatTime(seconds, guide) {
  if (seconds === void 0) {
    seconds = 0;
  }

  if (guide === void 0) {
    guide = seconds;
  }

  var s = Math.floor(seconds % 60);
  var m = Math.floor(seconds / 60 % 60);
  var h = Math.floor(seconds / 3600);
  var gm = Math.floor(guide / 60 % 60);
  var gh = Math.floor(guide / 3600); // handle invalid times

  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = '-';
    m = '-';
    s = '-';
  } // Check if we need to show hours


  h = h > 0 || gh > 0 ? h + ":" : ''; // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.

  m = ((h || gm >= 10) && m < 10 ? "0" + m : m) + ":"; // Check if leading zero is need for seconds

  s = s < 10 ? "0" + s : s;
  return h + m + s;
} // Check if the element belongs to a video element
// only accept <source />, <track />,
// <MyComponent isVideoChild />
// elements

function isVideoChild(c) {
  if (c.props && c.props.isVideoChild) {
    return true;
  }

  return c.type === 'source' || c.type === 'track';
}

var find = function find(elements, func) {
  return elements.filter(func)[0];
}; // check if two components are the same type


var isTypeEqual = function isTypeEqual(component1, component2) {
  var type1 = component1.type;
  var type2 = component2.type;

  if (typeof type1 === 'string' || typeof type2 === 'string') {
    return type1 === type2;
  }

  if (typeof type1 === 'function' && typeof type2 === 'function') {
    return type1.displayName === type2.displayName;
  }

  return false;
}; // merge default children
// sort them by `order` property
// filter them by `disabled` property


function mergeAndSortChildren(defaultChildren, _children, _parentProps, defaultOrder) {
  if (defaultOrder === void 0) {
    defaultOrder = 1;
  }

  var children = React.Children.toArray(_children);

  var order = _parentProps.order,
      parentProps = _objectWithoutPropertiesLoose(_parentProps, ["order"]); // ignore order from parent


  return children.filter(function (e) {
    return !e.props.disabled;
  }) // filter the disabled components
  .concat(defaultChildren.filter(function (c) {
    return !find(children, function (component) {
      return isTypeEqual(component, c);
    });
  })).map(function (element) {
    var defaultComponent = find(defaultChildren, function (c) {
      return isTypeEqual(c, element);
    });
    var defaultProps = defaultComponent ? defaultComponent.props : {};

    var props = _extends({}, parentProps, defaultProps, element.props);

    var e = React.cloneElement(element, props, element.props.children);
    return e;
  }).sort(function (a, b) {
    return (a.props.order || defaultOrder) - (b.props.order || defaultOrder);
  });
}
/**
 * Temporary utility for generating the warnings
 */

function deprecatedWarning(oldMethodCall, newMethodCall) {
  // eslint-disable-next-line no-console
  console.warn("WARNING: " + oldMethodCall + " will be deprecated soon! Please use " + newMethodCall + " instead.");
}
function throttle(callback, limit) {
  var _arguments = arguments;
  var wait = false;
  return function () {
    if (!wait) {
      // eslint-disable-next-line prefer-rest-params
      callback.apply(void 0, _arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}
var mediaProperties = ['error', 'src', 'srcObject', 'currentSrc', 'crossOrigin', 'networkState', 'preload', 'buffered', 'readyState', 'seeking', 'currentTime', 'duration', 'paused', 'defaultPlaybackRate', 'playbackRate', 'played', 'seekable', 'ended', 'autoplay', 'loop', 'mediaGroup', 'controller', 'controls', 'volume', 'muted', 'defaultMuted', 'audioTracks', 'videoTracks', 'textTracks', 'width', 'height', 'videoWidth', 'videoHeight', 'poster'];

var propTypes$3 = {
  actions: PropTypes.object,
  player: PropTypes.object,
  children: PropTypes.any,
  startTime: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  playsInline: PropTypes.bool,
  src: PropTypes.string,
  poster: PropTypes.string,
  className: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
  crossOrigin: PropTypes.string,
  onLoadStart: PropTypes.func,
  onWaiting: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeeked: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onProgress: PropTypes.func,
  onDurationChange: PropTypes.func,
  onError: PropTypes.func,
  onSuspend: PropTypes.func,
  onAbort: PropTypes.func,
  onEmptied: PropTypes.func,
  onStalled: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadedData: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onRateChange: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onResize: PropTypes.func
};

var Video =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Video, _Component);

  function Video(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.video = null; // the html5 video

    _this.play = _this.play.bind(_assertThisInitialized(_this));
    _this.pause = _this.pause.bind(_assertThisInitialized(_this));
    _this.seek = _this.seek.bind(_assertThisInitialized(_this));
    _this.forward = _this.forward.bind(_assertThisInitialized(_this));
    _this.replay = _this.replay.bind(_assertThisInitialized(_this));
    _this.toggleFullscreen = _this.toggleFullscreen.bind(_assertThisInitialized(_this));
    _this.getProperties = _this.getProperties.bind(_assertThisInitialized(_this));
    _this.renderChildren = _this.renderChildren.bind(_assertThisInitialized(_this));
    _this.handleLoadStart = _this.handleLoadStart.bind(_assertThisInitialized(_this));
    _this.handleCanPlay = _this.handleCanPlay.bind(_assertThisInitialized(_this));
    _this.handleCanPlayThrough = _this.handleCanPlayThrough.bind(_assertThisInitialized(_this));
    _this.handlePlay = _this.handlePlay.bind(_assertThisInitialized(_this));
    _this.handlePlaying = _this.handlePlaying.bind(_assertThisInitialized(_this));
    _this.handlePause = _this.handlePause.bind(_assertThisInitialized(_this));
    _this.handleEnded = _this.handleEnded.bind(_assertThisInitialized(_this));
    _this.handleWaiting = _this.handleWaiting.bind(_assertThisInitialized(_this));
    _this.handleSeeking = _this.handleSeeking.bind(_assertThisInitialized(_this));
    _this.handleSeeked = _this.handleSeeked.bind(_assertThisInitialized(_this));
    _this.handleFullscreenChange = _this.handleFullscreenChange.bind(_assertThisInitialized(_this));
    _this.handleError = _this.handleError.bind(_assertThisInitialized(_this));
    _this.handleSuspend = _this.handleSuspend.bind(_assertThisInitialized(_this));
    _this.handleAbort = _this.handleAbort.bind(_assertThisInitialized(_this));
    _this.handleEmptied = _this.handleEmptied.bind(_assertThisInitialized(_this));
    _this.handleStalled = _this.handleStalled.bind(_assertThisInitialized(_this));
    _this.handleLoadedMetaData = _this.handleLoadedMetaData.bind(_assertThisInitialized(_this));
    _this.handleLoadedData = _this.handleLoadedData.bind(_assertThisInitialized(_this));
    _this.handleTimeUpdate = _this.handleTimeUpdate.bind(_assertThisInitialized(_this));
    _this.handleRateChange = _this.handleRateChange.bind(_assertThisInitialized(_this));
    _this.handleVolumeChange = _this.handleVolumeChange.bind(_assertThisInitialized(_this));
    _this.handleDurationChange = _this.handleDurationChange.bind(_assertThisInitialized(_this));
    _this.handleProgress = throttle(_this.handleProgress.bind(_assertThisInitialized(_this)), 250);
    _this.handleKeypress = _this.handleKeypress.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Video.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate(); // make sure the children can get the video property
  } // get all video properties
  ;

  _proto.getProperties = function getProperties() {
    var _this2 = this;

    if (!this.video) {
      return null;
    }

    return mediaProperties.reduce(function (properties, key) {
      properties[key] = _this2.video[key];
      return properties;
    }, {});
  } // get playback rate
  ;

  // play the video
  _proto.play = function play() {
    var promise = this.video.play();

    if (promise !== undefined) {
      promise.catch(function () {}).then(function () {});
    }
  } // pause the video
  ;

  _proto.pause = function pause() {
    var promise = this.video.pause();

    if (promise !== undefined) {
      promise.catch(function () {}).then(function () {});
    }
  } // Change the video source and re-load the video:
  ;

  _proto.load = function load() {
    this.video.load();
  } // Add a new text track to the video
  ;

  _proto.addTextTrack = function addTextTrack() {
    var _this$video;

    (_this$video = this.video).addTextTrack.apply(_this$video, arguments);
  } // Check if your browser can play different types of video:
  ;

  _proto.canPlayType = function canPlayType() {
    var _this$video2;

    (_this$video2 = this.video).canPlayType.apply(_this$video2, arguments);
  } // toggle play
  ;

  _proto.togglePlay = function togglePlay() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  } // seek video by time
  ;

  _proto.seek = function seek(time) {
    try {
      this.video.currentTime = time;
    } catch (e) {// console.log(e, 'Video is not ready.')
    }
  } // jump forward x seconds
  ;

  _proto.forward = function forward(seconds) {
    this.seek(this.video.currentTime + seconds);
  } // jump back x seconds
  ;

  _proto.replay = function replay(seconds) {
    this.forward(-seconds);
  } // enter or exist full screen
  ;

  _proto.toggleFullscreen = function toggleFullscreen() {
    var _this$props = this.props,
        player = _this$props.player,
        actions = _this$props.actions;
    actions.toggleFullscreen(player);
  } // Fired when the user agent
  // begins looking for media data
  ;

  _proto.handleLoadStart = function handleLoadStart() {
    var _this$props2 = this.props,
        actions = _this$props2.actions,
        onLoadStart = _this$props2.onLoadStart;
    actions.handleLoadStart(this.getProperties());

    if (onLoadStart) {
      onLoadStart.apply(void 0, arguments);
    }
  } // A handler for events that
  // signal that waiting has ended
  ;

  _proto.handleCanPlay = function handleCanPlay() {
    var _this$props3 = this.props,
        actions = _this$props3.actions,
        onCanPlay = _this$props3.onCanPlay;
    actions.handleCanPlay(this.getProperties());

    if (onCanPlay) {
      onCanPlay.apply(void 0, arguments);
    }
  } // A handler for events that
  // signal that waiting has ended
  ;

  _proto.handleCanPlayThrough = function handleCanPlayThrough() {
    var _this$props4 = this.props,
        actions = _this$props4.actions,
        onCanPlayThrough = _this$props4.onCanPlayThrough;
    actions.handleCanPlayThrough(this.getProperties());

    if (onCanPlayThrough) {
      onCanPlayThrough.apply(void 0, arguments);
    }
  } // A handler for events that
  // signal that waiting has ended
  ;

  _proto.handlePlaying = function handlePlaying() {
    var _this$props5 = this.props,
        actions = _this$props5.actions,
        onPlaying = _this$props5.onPlaying;
    actions.handlePlaying(this.getProperties());

    if (onPlaying) {
      onPlaying.apply(void 0, arguments);
    }
  } // Fired whenever the media has been started
  ;

  _proto.handlePlay = function handlePlay() {
    var _this$props6 = this.props,
        actions = _this$props6.actions,
        onPlay = _this$props6.onPlay;
    actions.handlePlay(this.getProperties());

    if (onPlay) {
      onPlay.apply(void 0, arguments);
    }
  } // Fired whenever the media has been paused
  ;

  _proto.handlePause = function handlePause() {
    var _this$props7 = this.props,
        actions = _this$props7.actions,
        onPause = _this$props7.onPause;
    actions.handlePause(this.getProperties());

    if (onPause) {
      onPause.apply(void 0, arguments);
    }
  } // Fired when the duration of
  // the media resource is first known or changed
  ;

  _proto.handleDurationChange = function handleDurationChange() {
    var _this$props8 = this.props,
        actions = _this$props8.actions,
        onDurationChange = _this$props8.onDurationChange;
    actions.handleDurationChange(this.getProperties());

    if (onDurationChange) {
      onDurationChange.apply(void 0, arguments);
    }
  } // Fired while the user agent
  // is downloading media data
  ;

  _proto.handleProgress = function handleProgress() {
    var _this$props9 = this.props,
        actions = _this$props9.actions,
        onProgress = _this$props9.onProgress;

    if (this.video) {
      actions.handleProgressChange(this.getProperties());
    }

    if (onProgress) {
      onProgress.apply(void 0, arguments);
    }
  } // Fired when the end of the media resource
  // is reached (currentTime == duration)
  ;

  _proto.handleEnded = function handleEnded() {
    var _this$props10 = this.props,
        loop = _this$props10.loop,
        player = _this$props10.player,
        actions = _this$props10.actions,
        onEnded = _this$props10.onEnded;

    if (loop) {
      this.seek(0);
      this.play();
    } else if (!player.paused) {
      this.pause();
    }

    actions.handleEnd(this.getProperties());

    if (onEnded) {
      onEnded.apply(void 0, arguments);
    }
  } // Fired whenever the media begins waiting
  ;

  _proto.handleWaiting = function handleWaiting() {
    var _this$props11 = this.props,
        actions = _this$props11.actions,
        onWaiting = _this$props11.onWaiting;
    actions.handleWaiting(this.getProperties());

    if (onWaiting) {
      onWaiting.apply(void 0, arguments);
    }
  } // Fired whenever the player
  // is jumping to a new time
  ;

  _proto.handleSeeking = function handleSeeking() {
    var _this$props12 = this.props,
        actions = _this$props12.actions,
        onSeeking = _this$props12.onSeeking;
    actions.handleSeeking(this.getProperties());

    if (onSeeking) {
      onSeeking.apply(void 0, arguments);
    }
  } // Fired when the player has
  // finished jumping to a new time
  ;

  _proto.handleSeeked = function handleSeeked() {
    var _this$props13 = this.props,
        actions = _this$props13.actions,
        onSeeked = _this$props13.onSeeked;
    actions.handleSeeked(this.getProperties());

    if (onSeeked) {
      onSeeked.apply(void 0, arguments);
    }
  } // Handle Fullscreen Change
  ;

  _proto.handleFullscreenChange = function handleFullscreenChange() {} // Fires when the browser is
  // intentionally not getting media data
  ;

  _proto.handleSuspend = function handleSuspend() {
    var _this$props14 = this.props,
        actions = _this$props14.actions,
        onSuspend = _this$props14.onSuspend;
    actions.handleSuspend(this.getProperties());

    if (onSuspend) {
      onSuspend.apply(void 0, arguments);
    }
  } // Fires when the loading of an audio/video is aborted
  ;

  _proto.handleAbort = function handleAbort() {
    var _this$props15 = this.props,
        actions = _this$props15.actions,
        onAbort = _this$props15.onAbort;
    actions.handleAbort(this.getProperties());

    if (onAbort) {
      onAbort.apply(void 0, arguments);
    }
  } // Fires when the current playlist is empty
  ;

  _proto.handleEmptied = function handleEmptied() {
    var _this$props16 = this.props,
        actions = _this$props16.actions,
        onEmptied = _this$props16.onEmptied;
    actions.handleEmptied(this.getProperties());

    if (onEmptied) {
      onEmptied.apply(void 0, arguments);
    }
  } // Fires when the browser is trying to
  // get media data, but data is not available
  ;

  _proto.handleStalled = function handleStalled() {
    var _this$props17 = this.props,
        actions = _this$props17.actions,
        onStalled = _this$props17.onStalled;
    actions.handleStalled(this.getProperties());

    if (onStalled) {
      onStalled.apply(void 0, arguments);
    }
  } // Fires when the browser has loaded
  // meta data for the audio/video
  ;

  _proto.handleLoadedMetaData = function handleLoadedMetaData() {
    var _this$props18 = this.props,
        actions = _this$props18.actions,
        onLoadedMetadata = _this$props18.onLoadedMetadata,
        startTime = _this$props18.startTime;

    if (startTime && startTime > 0) {
      this.video.currentTime = startTime;
    }

    actions.handleLoadedMetaData(this.getProperties());

    if (onLoadedMetadata) {
      onLoadedMetadata.apply(void 0, arguments);
    }
  } // Fires when the browser has loaded
  // the current frame of the audio/video
  ;

  _proto.handleLoadedData = function handleLoadedData() {
    var _this$props19 = this.props,
        actions = _this$props19.actions,
        onLoadedData = _this$props19.onLoadedData;
    actions.handleLoadedData(this.getProperties());

    if (onLoadedData) {
      onLoadedData.apply(void 0, arguments);
    }
  } // Fires when the current
  // playback position has changed
  ;

  _proto.handleTimeUpdate = function handleTimeUpdate() {
    var _this$props20 = this.props,
        actions = _this$props20.actions,
        onTimeUpdate = _this$props20.onTimeUpdate;
    actions.handleTimeUpdate(this.getProperties());

    if (onTimeUpdate) {
      onTimeUpdate.apply(void 0, arguments);
    }
  }
  /**
   * Fires when the playing speed of the audio/video is changed
   */
  ;

  _proto.handleRateChange = function handleRateChange() {
    var _this$props21 = this.props,
        actions = _this$props21.actions,
        onRateChange = _this$props21.onRateChange;
    actions.handleRateChange(this.getProperties());

    if (onRateChange) {
      onRateChange.apply(void 0, arguments);
    }
  } // Fires when the volume has been changed
  ;

  _proto.handleVolumeChange = function handleVolumeChange() {
    var _this$props22 = this.props,
        actions = _this$props22.actions,
        onVolumeChange = _this$props22.onVolumeChange;
    actions.handleVolumeChange(this.getProperties());

    if (onVolumeChange) {
      onVolumeChange.apply(void 0, arguments);
    }
  } // Fires when an error occurred
  // during the loading of an audio/video
  ;

  _proto.handleError = function handleError() {
    var _this$props23 = this.props,
        actions = _this$props23.actions,
        onError = _this$props23.onError;
    actions.handleError(this.getProperties());

    if (onError) {
      onError.apply(void 0, arguments);
    }
  };

  _proto.handleResize = function handleResize() {
    var _this$props24 = this.props,
        actions = _this$props24.actions,
        onResize = _this$props24.onResize;
    actions.handleResize(this.getProperties());

    if (onResize) {
      onResize.apply(void 0, arguments);
    }
  };

  _proto.handleKeypress = function handleKeypress() {};

  _proto.renderChildren = function renderChildren() {
    var _this3 = this;

    var props = _extends({}, this.props, {
      video: this.video
    }); // to make sure the children can get video property


    if (!this.video) {
      return null;
    } // only keep <source />, <track />, <MyComponent isVideoChild /> elements


    return React.Children.toArray(this.props.children).filter(isVideoChild).map(function (c) {
      var cprops;

      if (typeof c.type === 'string') {
        // add onError to <source />
        if (c.type === 'source') {
          cprops = _extends({}, c.props);
          var preOnError = cprops.onError;

          cprops.onError = function () {
            if (preOnError) {
              preOnError.apply(void 0, arguments);
            }

            _this3.handleError.apply(_this3, arguments);
          };
        }
      } else {
        cprops = props;
      }

      return React.cloneElement(c, cprops);
    });
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$props25 = this.props,
        loop = _this$props25.loop,
        poster = _this$props25.poster,
        preload = _this$props25.preload,
        src = _this$props25.src,
        autoPlay = _this$props25.autoPlay,
        playsInline = _this$props25.playsInline,
        muted = _this$props25.muted,
        crossOrigin = _this$props25.crossOrigin,
        videoId = _this$props25.videoId;
    return React.createElement("video", {
      className: classNames('video-react-video', this.props.className),
      id: videoId,
      crossOrigin: crossOrigin,
      ref: function ref(c) {
        _this4.video = c;
      },
      muted: muted,
      preload: preload,
      loop: loop,
      playsInline: playsInline,
      autoPlay: autoPlay,
      poster: poster,
      src: src,
      onLoadStart: this.handleLoadStart,
      onWaiting: this.handleWaiting,
      onCanPlay: this.handleCanPlay,
      onCanPlayThrough: this.handleCanPlayThrough,
      onPlaying: this.handlePlaying,
      onEnded: this.handleEnded,
      onSeeking: this.handleSeeking,
      onSeeked: this.handleSeeked,
      onPlay: this.handlePlay,
      onPause: this.handlePause,
      onProgress: this.handleProgress,
      onDurationChange: this.handleDurationChange,
      onError: this.handleError,
      onSuspend: this.handleSuspend,
      onAbort: this.handleAbort,
      onEmptied: this.handleEmptied,
      onStalled: this.handleStalled,
      onLoadedMetadata: this.handleLoadedMetaData,
      onLoadedData: this.handleLoadedData,
      onTimeUpdate: this.handleTimeUpdate,
      onRateChange: this.handleRateChange,
      onVolumeChange: this.handleVolumeChange,
      tabIndex: "-1"
    }, this.renderChildren());
  };

  _createClass(Video, [{
    key: "playbackRate",
    get: function get() {
      return this.video.playbackRate;
    } // set playback rate
    // speed of video
    ,
    set: function set(rate) {
      this.video.playbackRate = rate;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.video.muted;
    },
    set: function set(val) {
      this.video.muted = val;
    }
  }, {
    key: "volume",
    get: function get() {
      return this.video.volume;
    },
    set: function set(val) {
      if (val > 1) {
        val = 1;
      }

      if (val < 0) {
        val = 0;
      }

      this.video.volume = val;
    } // video width

  }, {
    key: "videoWidth",
    get: function get() {
      return this.video.videoWidth;
    } // video height

  }, {
    key: "videoHeight",
    get: function get() {
      return this.video.videoHeight;
    }
  }]);

  return Video;
}(Component);
Video.propTypes = propTypes$3;
Video.displayName = 'Video';

var propTypes$4 = {
  manager: PropTypes.object,
  className: PropTypes.string
};

var Bezel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Bezel, _Component);

  function Bezel(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.timer = null;
    props.manager.subscribeToOperationStateChange(_this.handleStateChange.bind(_assertThisInitialized(_this)));
    _this.state = {
      hidden: true,
      operation: {}
    };
    return _this;
  }

  var _proto = Bezel.prototype;

  _proto.handleStateChange = function handleStateChange(state, prevState) {
    var _this2 = this;

    if (state.count !== prevState.count && state.operation.source === 'shortcut') {
      if (this.timer) {
        // previous animation is not finished
        clearTimeout(this.timer); // cancel it

        this.timer = null;
      } // show it
      // update operation


      this.setState({
        hidden: false,
        count: state.count,
        operation: state.operation
      }); // hide it after 0.5s

      this.timer = setTimeout(function () {
        _this2.setState({
          hidden: true
        });

        _this2.timer = null;
      }, 500);
    }
  };

  _proto.render = function render() {
    // only displays for shortcut so far
    if (this.state.operation.source !== 'shortcut') {
      return null;
    }

    var style = this.state.hidden ? {
      display: 'none'
    } : null;
    return React.createElement("div", {
      className: classNames({
        'video-react-bezel': true,
        'video-react-bezel-animation': this.state.count % 2 === 0,
        'video-react-bezel-animation-alt': this.state.count % 2 === 1
      }, this.props.className),
      style: style,
      role: "status",
      "aria-label": this.state.operation.action
    }, React.createElement("div", {
      className: classNames('video-react-bezel-icon', "video-react-bezel-icon-" + this.state.operation.action)
    }));
  };

  return Bezel;
}(Component);
Bezel.propTypes = propTypes$4;
Bezel.displayName = 'Bezel';

/**
 * Offset Left
 * getBoundingClientRect technique from
 * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
 *
 * @function findElPosition
 * @param {Element} el Element from which to get offset
 * @return {Object}
 */

function findElPosition(el) {
  var box;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  var _document = document,
      body = _document.body,
      docEl = _document.documentElement;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollLeft = window.pageXOffset || body.scrollLeft;
  var left = box.left + scrollLeft - clientLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var scrollTop = window.pageYOffset || body.scrollTop;
  var top = box.top + scrollTop - clientTop; // Android sometimes returns slightly off decimal values, so need to round

  return {
    left: Math.round(left),
    top: Math.round(top)
  };
}
/**
 * Get pointer position in element
 * Returns an object with x and y coordinates.
 * The base on the coordinates are the bottom left of the element.
 *
 * @function getPointerPosition
 * @param {Element} el Element on which to get the pointer position on
 * @param {Event} event Event object
 * @return {Object} This object will have x and y coordinates corresponding to the mouse position
 */

function getPointerPosition(el, event) {
  var position = {};
  var box = findElPosition(el);
  var boxW = el.offsetWidth;
  var boxH = el.offsetHeight;
  var boxY = box.top;
  var boxX = box.left;
  var evtPageY = event.pageY;
  var evtPageX = event.pageX;

  if (event.changedTouches) {
    evtPageX = event.changedTouches[0].pageX;
    evtPageY = event.changedTouches[0].pageY;
  }

  position.y = Math.max(0, Math.min(1, (boxY - evtPageY + boxH) / boxH));
  position.x = Math.max(0, Math.min(1, (evtPageX - boxX) / boxW));
  return position;
} // blur an element

function focusNode(reactNode) {
  var domNode = findDOMNode(reactNode);

  if (domNode && domNode.focus) {
    domNode.focus();
  }
} // check if an element has a class name

function hasClass(elm, cls) {
  var classes = elm.className.split(' ');

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].toLowerCase() === cls.toLowerCase()) {
      return true;
    }
  }

  return false;
}

var propTypes$5 = {
  clickable: PropTypes.bool,
  dblclickable: PropTypes.bool,
  manager: PropTypes.object,
  actions: PropTypes.object,
  player: PropTypes.object,
  shortcuts: PropTypes.array
};
var defaultProps$1 = {
  clickable: true,
  dblclickable: true
};

var Shortcut =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Shortcut, _Component);

  function Shortcut(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.defaultShortcuts = [{
      keyCode: 32,
      // spacebar
      handle: _this.togglePlay
    }, {
      keyCode: 75,
      // k
      handle: _this.togglePlay
    }, {
      keyCode: 70,
      // f
      handle: _this.toggleFullscreen
    }, {
      keyCode: 37,
      // Left arrow
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        }

        actions.replay(5, {
          action: 'replay-5',
          source: 'shortcut'
        }); // Go back 5 seconds
      }
    }, {
      keyCode: 74,
      // j
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        }

        actions.replay(10, {
          action: 'replay-10',
          source: 'shortcut'
        }); // Go back 10 seconds
      }
    }, {
      keyCode: 39,
      // Right arrow
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        }

        actions.forward(5, {
          action: 'forward-5',
          source: 'shortcut'
        }); // Go forward 5 seconds
      }
    }, {
      keyCode: 76,
      // l
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        }

        actions.forward(10, {
          action: 'forward-10',
          source: 'shortcut'
        }); // Go forward 10 seconds
      }
    }, {
      keyCode: 36,
      // Home
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        }

        actions.seek(0); // Go to beginning of video
      }
    }, {
      keyCode: 35,
      // End
      handle: function handle(player, actions) {
        if (!player.hasStarted) {
          return;
        } // Go to end of video


        actions.seek(player.duration);
      }
    }, {
      keyCode: 38,
      // Up arrow
      handle: function handle(player, actions) {
        // Increase volume 5%
        var v = player.volume + 0.05;

        if (v > 1) {
          v = 1;
        }

        actions.changeVolume(v, {
          action: 'volume-up',
          source: 'shortcut'
        });
      }
    }, {
      keyCode: 40,
      // Down arrow
      handle: function handle(player, actions) {
        // Decrease volume 5%
        var v = player.volume - 0.05;

        if (v < 0) {
          v = 0;
        }

        var action = v > 0 ? 'volume-down' : 'volume-off';
        actions.changeVolume(v, {
          action: action,
          source: 'shortcut'
        });
      }
    }, {
      keyCode: 190,
      // Shift + >
      shift: true,
      handle: function handle(player, actions) {
        // Increase speed
        var playbackRate = player.playbackRate;

        if (playbackRate >= 1.5) {
          playbackRate = 2;
        } else if (playbackRate >= 1.25) {
          playbackRate = 1.5;
        } else if (playbackRate >= 1.0) {
          playbackRate = 1.25;
        } else if (playbackRate >= 0.5) {
          playbackRate = 1.0;
        } else if (playbackRate >= 0.25) {
          playbackRate = 0.5;
        } else if (playbackRate >= 0) {
          playbackRate = 0.25;
        }

        actions.changeRate(playbackRate, {
          action: 'fast-forward',
          source: 'shortcut'
        });
      }
    }, {
      keyCode: 188,
      // Shift + <
      shift: true,
      handle: function handle(player, actions) {
        // Decrease speed
        var playbackRate = player.playbackRate;

        if (playbackRate <= 0.5) {
          playbackRate = 0.25;
        } else if (playbackRate <= 1.0) {
          playbackRate = 0.5;
        } else if (playbackRate <= 1.25) {
          playbackRate = 1.0;
        } else if (playbackRate <= 1.5) {
          playbackRate = 1.25;
        } else if (playbackRate <= 2) {
          playbackRate = 1.5;
        }

        actions.changeRate(playbackRate, {
          action: 'fast-rewind',
          source: 'shortcut'
        });
      }
    }];
    _this.shortcuts = [].concat(_this.defaultShortcuts);
    _this.mergeShortcuts = _this.mergeShortcuts.bind(_assertThisInitialized(_this));
    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleDoubleClick = _this.handleDoubleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Shortcut.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mergeShortcuts();
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('click', this.handleClick);
    document.addEventListener('dblclick', this.handleDoubleClick);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.shortcuts !== this.props.shortcuts) {
      this.mergeShortcuts();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('dblclick', this.handleDoubleClick);
  } // merge the shortcuts from props
  ;

  _proto.mergeShortcuts = function mergeShortcuts() {
    var getShortcutKey = function getShortcutKey(_ref) {
      var _ref$keyCode = _ref.keyCode,
          keyCode = _ref$keyCode === void 0 ? 0 : _ref$keyCode,
          _ref$ctrl = _ref.ctrl,
          ctrl = _ref$ctrl === void 0 ? false : _ref$ctrl,
          _ref$shift = _ref.shift,
          shift = _ref$shift === void 0 ? false : _ref$shift,
          _ref$alt = _ref.alt,
          alt = _ref$alt === void 0 ? false : _ref$alt;
      return keyCode + ":" + ctrl + ":" + shift + ":" + alt;
    };

    var defaultShortcuts = this.defaultShortcuts.reduce(function (shortcuts, shortcut) {
      var _Object$assign;

      return Object.assign(shortcuts, (_Object$assign = {}, _Object$assign[getShortcutKey(shortcut)] = shortcut, _Object$assign));
    }, {});
    var mergedShortcuts = (this.props.shortcuts || []).reduce(function (shortcuts, shortcut) {
      var keyCode = shortcut.keyCode,
          handle = shortcut.handle;

      if (keyCode && typeof handle === 'function') {
        var _Object$assign2;

        return Object.assign(shortcuts, (_Object$assign2 = {}, _Object$assign2[getShortcutKey(shortcut)] = shortcut, _Object$assign2));
      }

      return shortcuts;
    }, defaultShortcuts);

    var gradeShortcut = function gradeShortcut(s) {
      var score = 0;
      var ps = ['ctrl', 'shift', 'alt'];
      ps.forEach(function (key) {
        if (s[key]) {
          score++;
        }
      });
      return score;
    };

    this.shortcuts = Object.keys(mergedShortcuts).map(function (key) {
      return mergedShortcuts[key];
    }).sort(function (a, b) {
      return gradeShortcut(b) - gradeShortcut(a);
    });
  };

  _proto.togglePlay = function togglePlay(player, actions) {
    if (player.paused) {
      actions.play({
        action: 'play',
        source: 'shortcut'
      });
    } else {
      actions.pause({
        action: 'pause',
        source: 'shortcut'
      });
    }
  };

  _proto.toggleFullscreen = function toggleFullscreen(player, actions) {
    actions.toggleFullscreen(player);
  };

  _proto.handleKeyPress = function handleKeyPress(e) {
    var _this$props = this.props,
        player = _this$props.player,
        actions = _this$props.actions;

    if (!player.isActive) {
      return;
    }

    if (document.activeElement && (hasClass(document.activeElement, 'video-react-control') || hasClass(document.activeElement, 'video-react-menu-button-active') || // || hasClass(document.activeElement, 'video-react-slider')
    hasClass(document.activeElement, 'video-react-big-play-button'))) {
      return;
    }

    var keyCode = e.keyCode || e.which;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    var alt = e.altKey;
    var shortcut = this.shortcuts.filter(function (s) {
      if (!s.keyCode || s.keyCode - keyCode !== 0) {
        return false;
      }

      if (s.ctrl !== undefined && s.ctrl !== ctrl || s.shift !== undefined && s.shift !== shift || s.alt !== undefined && s.alt !== alt) {
        return false;
      }

      return true;
    })[0];

    if (shortcut) {
      shortcut.handle(player, actions);
      e.preventDefault();
    }
  } // only if player is active and player is ready
  ;

  _proto.canBeClicked = function canBeClicked(player, e) {
    if (!player.isActive || e.target.nodeName !== 'VIDEO' || player.readyState !== 4) {
      return false;
    }

    return true;
  };

  _proto.handleClick = function handleClick(e) {
    var _this$props2 = this.props,
        player = _this$props2.player,
        actions = _this$props2.actions,
        clickable = _this$props2.clickable;

    if (!this.canBeClicked(player, e) || !clickable) {
      return;
    }

    this.togglePlay(player, actions); // e.preventDefault();
  };

  _proto.handleDoubleClick = function handleDoubleClick(e) {
    var _this$props3 = this.props,
        player = _this$props3.player,
        actions = _this$props3.actions,
        dblclickable = _this$props3.dblclickable;

    if (!this.canBeClicked(player, e) || !dblclickable) {
      return;
    }

    this.toggleFullscreen(player, actions); // e.preventDefault();
  } // this component dose not render anything
  // it's just for the key down event
  ;

  _proto.render = function render() {
    return null;
  };

  return Shortcut;
}(Component);
Shortcut.propTypes = propTypes$5;
Shortcut.defaultProps = defaultProps$1;
Shortcut.displayName = 'Shortcut';

var propTypes$6 = {
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  stepForward: PropTypes.func,
  stepBack: PropTypes.func,
  sliderActive: PropTypes.func,
  sliderInactive: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  getPercent: PropTypes.func,
  vertical: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string,
  valuenow: PropTypes.string,
  valuetext: PropTypes.string
};

var Slider =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Slider, _Component);

  function Slider(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    _this.stepForward = _this.stepForward.bind(_assertThisInitialized(_this));
    _this.stepBack = _this.stepBack.bind(_assertThisInitialized(_this));
    _this.calculateDistance = _this.calculateDistance.bind(_assertThisInitialized(_this));
    _this.getProgress = _this.getProgress.bind(_assertThisInitialized(_this));
    _this.renderChildren = _this.renderChildren.bind(_assertThisInitialized(_this));
    _this.state = {
      active: false
    };
    return _this;
  }

  var _proto = Slider.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('mouseup', this.handleMouseUp, true);
    document.removeEventListener('touchmove', this.handleMouseMove, true);
    document.removeEventListener('touchend', this.handleMouseUp, true);
    document.removeEventListener('keydown', this.handleKeyPress, true);
  };

  _proto.getProgress = function getProgress() {
    var getPercent = this.props.getPercent;

    if (!getPercent) {
      return 0;
    }

    var progress = getPercent(); // Protect against no duration and other division issues

    if (typeof progress !== 'number' || progress < 0 || progress === Infinity) {
      progress = 0;
    }

    return progress;
  };

  _proto.handleMouseDown = function handleMouseDown(event) {
    var onMouseDown = this.props.onMouseDown; // event.preventDefault();
    // event.stopPropagation();

    document.addEventListener('mousemove', this.handleMouseMove, true);
    document.addEventListener('mouseup', this.handleMouseUp, true);
    document.addEventListener('touchmove', this.handleMouseMove, true);
    document.addEventListener('touchend', this.handleMouseUp, true);
    this.setState({
      active: true
    });

    if (this.props.sliderActive) {
      this.props.sliderActive(event);
    }

    this.handleMouseMove(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  _proto.handleMouseMove = function handleMouseMove(event) {
    var onMouseMove = this.props.onMouseMove;

    if (onMouseMove) {
      onMouseMove(event);
    }
  };

  _proto.handleMouseUp = function handleMouseUp(event) {
    var onMouseUp = this.props.onMouseUp;
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('mouseup', this.handleMouseUp, true);
    document.removeEventListener('touchmove', this.handleMouseMove, true);
    document.removeEventListener('touchend', this.handleMouseUp, true);
    this.setState({
      active: false
    });

    if (this.props.sliderInactive) {
      this.props.sliderInactive(event);
    }

    if (onMouseUp) {
      onMouseUp(event);
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    document.addEventListener('keydown', this.handleKeyPress, true);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  _proto.handleBlur = function handleBlur(e) {
    document.removeEventListener('keydown', this.handleKeyPress, true);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _proto.handleClick = function handleClick(event) {
    event.preventDefault(); // event.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  _proto.handleKeyPress = function handleKeyPress(event) {
    if (event.which === 37 || event.which === 40) {
      // Left and Down Arrows
      event.preventDefault();
      event.stopPropagation();
      this.stepBack();
    } else if (event.which === 38 || event.which === 39) {
      // Up and Right Arrows
      event.preventDefault();
      event.stopPropagation();
      this.stepForward();
    }
  };

  _proto.stepForward = function stepForward() {
    if (this.props.stepForward) {
      this.props.stepForward();
    }
  };

  _proto.stepBack = function stepBack() {
    if (this.props.stepBack) {
      this.props.stepBack();
    }
  };

  _proto.calculateDistance = function calculateDistance(event) {
    var node = findDOMNode(this);
    var position = getPointerPosition(node, event);

    if (this.props.vertical) {
      return position.y;
    }

    return position.x;
  };

  _proto.renderChildren = function renderChildren() {
    var progress = this.getProgress();
    var percentage = (progress * 100).toFixed(2) + "%";
    return React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        progress: progress,
        percentage: percentage
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        vertical = _this$props.vertical,
        label = _this$props.label,
        valuenow = _this$props.valuenow,
        valuetext = _this$props.valuetext;
    return React.createElement("div", {
      className: classNames(this.props.className, {
        'video-react-slider-vertical': vertical,
        'video-react-slider-horizontal': !vertical,
        'video-react-sliding': this.state.active
      }, 'video-react-slider'),
      tabIndex: "0",
      role: "slider",
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleMouseDown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      "aria-label": label || '',
      "aria-valuenow": valuenow || '',
      "aria-valuetext": valuetext || '',
      "aria-valuemin": 0,
      "aria-valuemax": 100
    }, this.renderChildren());
  };

  return Slider;
}(Component);
Slider.propTypes = propTypes$6;
Slider.displayName = 'Slider';

var propTypes$7 = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  percentage: PropTypes.string,
  className: PropTypes.string
}; // Shows play progress

function PlayProgressBar(_ref) {
  var currentTime = _ref.currentTime,
      duration = _ref.duration,
      percentage = _ref.percentage,
      className = _ref.className;
  return React.createElement("div", {
    "data-current-time": formatTime(currentTime, duration),
    className: classNames('video-react-play-progress video-react-slider-bar', className),
    style: {
      width: percentage
    }
  }, React.createElement("span", {
    className: "video-react-control-text"
  }, "Progress: " + percentage));
}
PlayProgressBar.propTypes = propTypes$7;
PlayProgressBar.displayName = 'PlayProgressBar';

var propTypes$8 = {
  duration: PropTypes.number,
  buffered: PropTypes.object,
  className: PropTypes.string
}; // Shows load progress

function LoadProgressBar(_ref) {
  var buffered = _ref.buffered,
      duration = _ref.duration,
      className = _ref.className;

  if (!buffered || !buffered.length) {
    return null;
  }

  var bufferedEnd = buffered.end(buffered.length - 1);
  var style = {};

  if (bufferedEnd > duration) {
    bufferedEnd = duration;
  } // get the percent width of a time compared to the total end


  function percentify(time, end) {
    var percent = time / end || 0; // no NaN

    return (percent >= 1 ? 1 : percent) * 100 + "%";
  } // the width of the progress bar


  style.width = percentify(bufferedEnd, duration);
  var parts = []; // add child elements to represent the individual buffered time ranges

  for (var i = 0; i < buffered.length; i++) {
    var start = buffered.start(i);
    var end = buffered.end(i); // set the percent based on the width of the progress bar (bufferedEnd)

    var part = React.createElement("div", {
      style: {
        left: percentify(start, bufferedEnd),
        width: percentify(end - start, bufferedEnd)
      },
      key: "part-" + i
    });
    parts.push(part);
  }

  if (parts.length === 0) {
    parts = null;
  }

  return React.createElement("div", {
    style: style,
    className: classNames('video-react-load-progress', className)
  }, React.createElement("span", {
    className: "video-react-control-text"
  }, "Loaded: 0%"), parts);
}
LoadProgressBar.propTypes = propTypes$8;
LoadProgressBar.displayName = 'LoadProgressBar';

function MouseTimeDisplay(_ref) {
  var duration = _ref.duration,
      mouseTime = _ref.mouseTime,
      className = _ref.className,
      text = _ref.text;

  if (!mouseTime.time) {
    return null;
  }

  var time = text || formatTime(mouseTime.time, duration);
  return React.createElement("div", {
    className: classNames('video-react-mouse-display', className),
    style: {
      left: mouseTime.position + "px"
    },
    "data-current-time": time
  });
}

MouseTimeDisplay.propTypes = {
  duration: PropTypes.number,
  mouseTime: PropTypes.object,
  className: PropTypes.string
};
MouseTimeDisplay.displayName = 'MouseTimeDisplay';

var propTypes$9 = {
  player: PropTypes.object,
  mouseTime: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string
};

var SeekBar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SeekBar, _Component);

  function SeekBar(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.getPercent = _this.getPercent.bind(_assertThisInitialized(_this));
    _this.getNewTime = _this.getNewTime.bind(_assertThisInitialized(_this));
    _this.stepForward = _this.stepForward.bind(_assertThisInitialized(_this));
    _this.stepBack = _this.stepBack.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = SeekBar.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.componentDidUpdate = function componentDidUpdate() {}
  /**
   * Get percentage of video played
   *
   * @return {Number} Percentage played
   * @method getPercent
   */
  ;

  _proto.getPercent = function getPercent() {
    var _this$props$player = this.props.player,
        currentTime = _this$props$player.currentTime,
        seekingTime = _this$props$player.seekingTime,
        duration = _this$props$player.duration;
    var time = seekingTime || currentTime;
    var percent = time / duration;
    return percent >= 1 ? 1 : percent;
  };

  _proto.getNewTime = function getNewTime(event) {
    var duration = this.props.player.duration;
    var distance = this.slider.calculateDistance(event);
    var newTime = distance * duration; // Don't let video end while scrubbing.

    return newTime === duration ? newTime - 0.1 : newTime;
  };

  _proto.handleMouseDown = function handleMouseDown() {};

  _proto.handleMouseUp = function handleMouseUp(event) {
    var actions = this.props.actions;
    var newTime = this.getNewTime(event); // Set new time (tell video to seek to new time)

    actions.seek(newTime);
    actions.handleEndSeeking(newTime);
  };

  _proto.handleMouseMove = function handleMouseMove(event) {
    var actions = this.props.actions;
    var newTime = this.getNewTime(event);
    actions.handleSeekingTime(newTime);
  };

  _proto.stepForward = function stepForward() {
    var actions = this.props.actions;
    actions.forward(5);
  };

  _proto.stepBack = function stepBack() {
    var actions = this.props.actions;
    actions.replay(5);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        _this$props$player2 = _this$props.player,
        currentTime = _this$props$player2.currentTime,
        seekingTime = _this$props$player2.seekingTime,
        duration = _this$props$player2.duration,
        buffered = _this$props$player2.buffered,
        mouseTime = _this$props.mouseTime;
    var time = seekingTime || currentTime;
    return React.createElement(Slider, {
      ref: function ref(input) {
        _this2.slider = input;
      },
      label: "video progress bar",
      className: classNames('video-react-progress-holder', this.props.className),
      valuenow: (this.getPercent() * 100).toFixed(2),
      valuetext: formatTime(time, duration),
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      getPercent: this.getPercent,
      stepForward: this.stepForward,
      stepBack: this.stepBack
    }, React.createElement(LoadProgressBar, {
      buffered: buffered,
      currentTime: time,
      duration: duration
    }), React.createElement(MouseTimeDisplay, {
      duration: duration,
      mouseTime: mouseTime
    }), React.createElement(PlayProgressBar, {
      currentTime: time,
      duration: duration
    }));
  };

  return SeekBar;
}(Component);
SeekBar.propTypes = propTypes$9;
SeekBar.displayName = 'SeekBar';

var propTypes$a = {
  player: PropTypes.object,
  className: PropTypes.string
};

var ProgressControl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ProgressControl, _Component);

  function ProgressControl(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.state = {
      mouseTime: {
        time: null,
        position: 0
      }
    };
    _this.handleMouseMoveThrottle = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ProgressControl.prototype;

  _proto.handleMouseMove = function handleMouseMove(event) {
    if (!event.pageX) {
      return;
    }

    var duration = this.props.player.duration;
    var node = findDOMNode(this.seekBar);
    var newTime = getPointerPosition(node, event).x * duration;
    var position = event.pageX - findElPosition(node).left;
    this.setState({
      mouseTime: {
        time: newTime,
        position: position
      }
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var className = this.props.className;
    return React.createElement("div", {
      onMouseMove: this.handleMouseMoveThrottle,
      className: classNames('video-react-progress-control video-react-control', className)
    }, React.createElement(SeekBar, _extends({
      mouseTime: this.state.mouseTime,
      ref: function ref(c) {
        _this2.seekBar = c;
      }
    }, this.props)));
  };

  return ProgressControl;
}(Component);
ProgressControl.propTypes = propTypes$a;
ProgressControl.displayName = 'ProgressControl';

var propTypes$b = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string
};

var PlayToggle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PlayToggle, _Component);

  function PlayToggle(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PlayToggle.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        actions = _this$props.actions,
        player = _this$props.player;

    if (player.paused) {
      actions.play();
    } else {
      actions.pause();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        player = _this$props2.player,
        className = _this$props2.className;
    var controlText = player.paused ? 'Play' : 'Pause';
    return React.createElement("button", {
      ref: function ref(c) {
        _this2.button = c;
      },
      className: classNames(className, {
        'video-react-play-control': true,
        'video-react-control': true,
        'video-react-button': true,
        'video-react-paused': player.paused,
        'video-react-playing': !player.paused
      }),
      type: "button",
      tabIndex: "0",
      onClick: this.handleClick
    }, React.createElement("span", {
      className: "video-react-control-text"
    }, controlText));
  };

  return PlayToggle;
}(Component);
PlayToggle.propTypes = propTypes$b;
PlayToggle.displayName = 'PlayToggle';

var propTypes$c = {
  actions: PropTypes.object,
  className: PropTypes.string,
  seconds: PropTypes.oneOf([5, 10, 30])
};
var defaultProps$2 = {
  seconds: 10
};
var ForwardReplayControl = (function (mode) {
  var ForwardReplayControl =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ForwardReplayControl, _Component);

    function ForwardReplayControl(props, context) {
      var _this;

      _this = _Component.call(this, props, context) || this;
      _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = ForwardReplayControl.prototype;

    _proto.handleClick = function handleClick() {
      var _this$props = this.props,
          actions = _this$props.actions,
          seconds = _this$props.seconds; // Depends mode to implement different actions

      if (mode === 'forward') {
        actions.forward(seconds);
      } else {
        actions.replay(seconds);
      }
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          seconds = _this$props2.seconds,
          className = _this$props2.className;
      var classNames = ['video-react-control', 'video-react-button', 'video-react-icon'];
      classNames.push("video-react-icon-" + mode + "-" + seconds, "video-react-" + mode + "-control");

      if (className) {
        classNames.push(className);
      }

      return React.createElement("button", {
        ref: function ref(c) {
          _this2.button = c;
        },
        className: classNames.join(' '),
        type: "button",
        onClick: this.handleClick
      }, React.createElement("span", {
        className: "video-react-control-text"
      }, mode + " " + seconds + " seconds"));
    };

    return ForwardReplayControl;
  }(Component);

  ForwardReplayControl.propTypes = propTypes$c;
  ForwardReplayControl.defaultProps = defaultProps$2;
  return ForwardReplayControl;
});

var ForwardControl = ForwardReplayControl('forward');
ForwardControl.displayName = 'ForwardControl';

var ReplayControl = ForwardReplayControl('replay');
ReplayControl.displayName = 'ReplayControl';

var propTypes$d = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string
};

var FullscreenToggle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FullscreenToggle, _Component);

  function FullscreenToggle(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = FullscreenToggle.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        player = _this$props.player,
        actions = _this$props.actions;
    actions.toggleFullscreen(player);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        player = _this$props2.player,
        className = _this$props2.className;
    return React.createElement("button", {
      className: classNames(className, {
        'video-react-icon-fullscreen-exit': player.isFullscreen,
        'video-react-icon-fullscreen': !player.isFullscreen
      }, 'video-react-fullscreen-control video-react-control video-react-button video-react-icon'),
      ref: function ref(c) {
        _this2.button = c;
      },
      type: "button",
      tabIndex: "0",
      onClick: this.handleClick
    }, React.createElement("span", {
      className: "video-react-control-text"
    }, "Non-Fullscreen"));
  };

  return FullscreenToggle;
}(Component);
FullscreenToggle.propTypes = propTypes$d;
FullscreenToggle.displayName = 'FullscreenToggle';

var propTypes$e = {
  player: PropTypes.object,
  className: PropTypes.string
};

function RemainingTimeDisplay(_ref) {
  var _ref$player = _ref.player,
      currentTime = _ref$player.currentTime,
      duration = _ref$player.duration,
      className = _ref.className;
  var remainingTime = duration - currentTime;
  var formattedTime = formatTime(remainingTime);
  return React.createElement("div", {
    className: classNames('video-react-remaining-time video-react-time-control video-react-control', className)
  }, React.createElement("div", {
    className: "video-react-remaining-time-display",
    "aria-live": "off"
  }, React.createElement("span", {
    className: "video-react-control-text"
  }, "Remaining Time "), "-" + formattedTime));
}

RemainingTimeDisplay.propTypes = propTypes$e;
RemainingTimeDisplay.displayName = 'RemainingTimeDisplay';

var propTypes$f = {
  player: PropTypes.object,
  className: PropTypes.string
};

function CurrentTimeDisplay(_ref) {
  var _ref$player = _ref.player,
      currentTime = _ref$player.currentTime,
      duration = _ref$player.duration,
      className = _ref.className;
  var formattedTime = formatTime(currentTime, duration);
  return React.createElement("div", {
    className: classNames('video-react-current-time video-react-time-control video-react-control', className)
  }, React.createElement("div", {
    className: "video-react-current-time-display",
    "aria-live": "off"
  }, React.createElement("span", {
    className: "video-react-control-text"
  }, "Current Time "), formattedTime));
}

CurrentTimeDisplay.propTypes = propTypes$f;
CurrentTimeDisplay.displayName = 'CurrentTimeDisplay';

var propTypes$g = {
  player: PropTypes.object,
  className: PropTypes.string
};

function DurationDisplay(_ref) {
  var duration = _ref.player.duration,
      className = _ref.className;
  var formattedTime = formatTime(duration);
  return React.createElement("div", {
    className: classNames(className, 'video-react-duration video-react-time-control video-react-control')
  }, React.createElement("div", {
    className: "video-react-duration-display",
    "aria-live": "off"
  }, React.createElement("span", {
    className: "video-react-control-text"
  }, "Duration Time "), formattedTime));
}

DurationDisplay.propTypes = propTypes$g;
DurationDisplay.displayName = 'DurationDisplay';

var propTypes$h = {
  separator: PropTypes.string,
  className: PropTypes.string
};
function TimeDivider(_ref) {
  var separator = _ref.separator,
      className = _ref.className;
  var separatorText = separator || '/';
  return React.createElement("div", {
    className: classNames('video-react-time-control video-react-time-divider', className),
    dir: "ltr"
  }, React.createElement("div", null, React.createElement("span", null, separatorText)));
}
TimeDivider.propTypes = propTypes$h;
TimeDivider.displayName = 'TimeDivider';

var propTypes$i = {
  tagName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string
};
var defaultProps$3 = {
  tagName: 'div'
};

var ClickableComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ClickableComponent, _Component);

  function ClickableComponent(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleKeypress = _this.handleKeypress.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ClickableComponent.prototype;

  _proto.handleKeypress = function handleKeypress(event) {
    // Support Space (32) or Enter (13) key operation to fire a click event
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  _proto.handleClick = function handleClick(event) {
    var onClick = this.props.onClick;
    onClick(event);
  };

  _proto.handleFocus = function handleFocus(e) {
    document.addEventListener('keydown', this.handleKeypress);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  _proto.handleBlur = function handleBlur(e) {
    document.removeEventListener('keydown', this.handleKeypress);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _proto.render = function render() {
    var Tag = this.props.tagName;

    var props = _extends({}, this.props);

    delete props.tagName;
    delete props.className;
    return React.createElement(Tag, _extends({
      className: classNames(this.props.className),
      role: "button",
      tabIndex: "0",
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    }, props));
  };

  return ClickableComponent;
}(Component);
ClickableComponent.propTypes = propTypes$i;
ClickableComponent.defaultProps = defaultProps$3;
ClickableComponent.displayName = 'ClickableComponent';

var propTypes$j = {
  player: PropTypes.object,
  children: PropTypes.any
};

var Popup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Popup, _Component);

  function Popup(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Popup.prototype;

  _proto.handleClick = function handleClick(event) {
    event.preventDefault(); // event.stopPropagation();
  };

  _proto.render = function render() {
    var children = this.props.children;
    return React.createElement("div", {
      className: "video-react-menu",
      onClick: this.handleClick
    }, React.createElement("div", {
      className: "video-react-menu-content"
    }, children));
  };

  return Popup;
}(Component);
Popup.propTypes = propTypes$j;
Popup.displayName = 'Popup';

var propTypes$k = {
  inline: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string
};
var defaultProps$4 = {
  inline: true
};
function PopupButton(props) {
  var inline = props.inline,
      className = props.className;

  var ps = _extends({}, props);

  delete ps.children;
  delete ps.inline;
  delete ps.className;
  return React.createElement(ClickableComponent, _extends({
    className: classNames(className, {
      'video-react-menu-button-inline': !!inline,
      'video-react-menu-button-popup': !inline
    }, 'video-react-control video-react-button video-react-menu-button')
  }, ps), React.createElement(Popup, props));
}
PopupButton.propTypes = propTypes$k;
PopupButton.defaultProps = defaultProps$4;
PopupButton.displayName = 'PopupButton';

var propTypes$l = {
  percentage: PropTypes.string,
  vertical: PropTypes.bool,
  className: PropTypes.string
};
var defaultProps$5 = {
  percentage: '100%',
  vertical: false
};

function VolumeLevel(_ref) {
  var percentage = _ref.percentage,
      vertical = _ref.vertical,
      className = _ref.className;
  var style = {};

  if (vertical) {
    style.height = percentage;
  } else {
    style.width = percentage;
  }

  return React.createElement("div", {
    className: classNames(className, 'video-react-volume-level'),
    style: style
  }, React.createElement("span", {
    className: "video-react-control-text"
  }));
}

VolumeLevel.propTypes = propTypes$l;
VolumeLevel.defaultProps = defaultProps$5;
VolumeLevel.displayName = 'VolumeLevel';

var propTypes$m = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

var VolumeBar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(VolumeBar, _Component);

  function VolumeBar(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.state = {
      percentage: '0%'
    };
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handlePercentageChange = _this.handlePercentageChange.bind(_assertThisInitialized(_this));
    _this.checkMuted = _this.checkMuted.bind(_assertThisInitialized(_this));
    _this.getPercent = _this.getPercent.bind(_assertThisInitialized(_this));
    _this.stepForward = _this.stepForward.bind(_assertThisInitialized(_this));
    _this.stepBack = _this.stepBack.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = VolumeBar.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.getPercent = function getPercent() {
    var player = this.props.player;

    if (player.muted) {
      return 0;
    }

    return player.volume;
  };

  _proto.checkMuted = function checkMuted() {
    var _this$props = this.props,
        player = _this$props.player,
        actions = _this$props.actions;

    if (player.muted) {
      actions.mute(false);
    }
  };

  _proto.handleMouseMove = function handleMouseMove(event) {
    var actions = this.props.actions;
    this.checkMuted();
    var distance = this.slider.calculateDistance(event);
    actions.changeVolume(distance);
  };

  _proto.stepForward = function stepForward() {
    var _this$props2 = this.props,
        player = _this$props2.player,
        actions = _this$props2.actions;
    this.checkMuted();
    actions.changeVolume(player.volume + 0.1);
  };

  _proto.stepBack = function stepBack() {
    var _this$props3 = this.props,
        player = _this$props3.player,
        actions = _this$props3.actions;
    this.checkMuted();
    actions.changeVolume(player.volume - 0.1);
  };

  _proto.handleFocus = function handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  _proto.handleBlur = function handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _proto.handlePercentageChange = function handlePercentageChange(percentage) {
    if (percentage !== this.state.percentage) {
      this.setState({
        percentage: percentage
      });
    }
  };

  _proto.handleClick = function handleClick(event) {
    event.stopPropagation();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        player = _this$props4.player,
        className = _this$props4.className;
    var volume = (player.volume * 100).toFixed(2);
    return React.createElement(Slider, _extends({
      ref: function ref(c) {
        _this2.slider = c;
      },
      label: "volume level",
      valuenow: volume,
      valuetext: volume + "%",
      onMouseMove: this.handleMouseMove,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      sliderActive: this.handleFocus,
      sliderInactive: this.handleBlur,
      getPercent: this.getPercent,
      onPercentageChange: this.handlePercentageChange,
      stepForward: this.stepForward,
      stepBack: this.stepBack
    }, this.props, {
      className: classNames(className, 'video-react-volume-bar video-react-slider-bar')
    }), React.createElement(VolumeLevel, this.props));
  };

  return VolumeBar;
}(Component);

VolumeBar.propTypes = propTypes$m;
VolumeBar.displayName = 'VolumeBar';

var propTypes$n = {
  player: PropTypes.object,
  actions: PropTypes.object,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  alwaysShowVolume: PropTypes.bool
};
var defaultProps$6 = {
  vertical: false
};

var VolumeMenuButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(VolumeMenuButton, _Component);

  function VolumeMenuButton(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.state = {
      active: false
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = VolumeMenuButton.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        player = _this$props.player,
        actions = _this$props.actions;
    actions.mute(!player.muted);
  };

  _proto.handleFocus = function handleFocus() {
    this.setState({
      active: true
    });
  };

  _proto.handleBlur = function handleBlur() {
    this.setState({
      active: false
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        vertical = _this$props2.vertical,
        player = _this$props2.player,
        className = _this$props2.className;
    var inline = !vertical;
    var level = this.volumeLevel;
    return React.createElement(PopupButton, {
      className: classNames(className, {
        'video-react-volume-menu-button-vertical': vertical,
        'video-react-volume-menu-button-horizontal': !vertical,
        'video-react-vol-muted': player.muted,
        'video-react-vol-0': level === 0 && !player.muted,
        'video-react-vol-1': level === 1,
        'video-react-vol-2': level === 2,
        'video-react-vol-3': level === 3,
        'video-react-slider-active': this.props.alwaysShowVolume || this.state.active,
        'video-react-lock-showing': this.props.alwaysShowVolume || this.state.active
      }, 'video-react-volume-menu-button'),
      onClick: this.handleClick,
      inline: inline
    }, React.createElement(VolumeBar, _extends({
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    }, this.props)));
  };

  _createClass(VolumeMenuButton, [{
    key: "volumeLevel",
    get: function get() {
      var _this$props$player = this.props.player,
          volume = _this$props$player.volume,
          muted = _this$props$player.muted;
      var level = 3;

      if (volume === 0 || muted) {
        level = 0;
      } else if (volume < 0.33) {
        level = 1;
      } else if (volume < 0.67) {
        level = 2;
      }

      return level;
    }
  }]);

  return VolumeMenuButton;
}(Component);

VolumeMenuButton.propTypes = propTypes$n;
VolumeMenuButton.defaultProps = defaultProps$6;
VolumeMenuButton.displayName = 'VolumeMenuButton';

var propTypes$o = {
  children: PropTypes.any
};

var Menu =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Menu, _Component);

  function Menu(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.handleClick = function handleClick(event) {
    event.preventDefault(); // event.stopPropagation();
  };

  _proto.render = function render() {
    return React.createElement("div", {
      className: "video-react-menu video-react-lock-showing",
      role: "presentation",
      onClick: this.handleClick
    }, React.createElement("ul", {
      className: "video-react-menu-content"
    }, this.props.children));
  };

  return Menu;
}(Component);
Menu.propTypes = propTypes$o;
Menu.displayName = 'Menu';

var propTypes$p = {
  item: PropTypes.object,
  index: PropTypes.number,
  activateIndex: PropTypes.number,
  onSelectItem: PropTypes.func
};

var MenuItem =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MenuItem, _Component);

  function MenuItem(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        index = _this$props.index,
        onSelectItem = _this$props.onSelectItem;
    onSelectItem(index);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        item = _this$props2.item,
        index = _this$props2.index,
        activateIndex = _this$props2.activateIndex;
    return React.createElement("li", {
      className: classNames({
        'video-react-menu-item': true,
        'video-react-selected': index === activateIndex
      }),
      role: "menuitem",
      onClick: this.handleClick
    }, item.label, React.createElement("span", {
      className: "video-react-control-text"
    }));
  };

  return MenuItem;
}(Component);
MenuItem.propTypes = propTypes$p;
MenuItem.displayName = 'MenuItem';

var propTypes$q = {
  inline: PropTypes.bool,
  items: PropTypes.array,
  className: PropTypes.string,
  onSelectItem: PropTypes.func,
  children: PropTypes.any,
  selectedIndex: PropTypes.number
};

var MenuButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MenuButton, _Component);

  function MenuButton(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.state = {
      active: false,
      activateIndex: props.selectedIndex || 0
    };
    _this.commitSelection = _this.commitSelection.bind(_assertThisInitialized(_this));
    _this.activateMenuItem = _this.activateMenuItem.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.renderMenu = _this.renderMenu.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.handleUpArrow = _this.handleUpArrow.bind(_assertThisInitialized(_this));
    _this.handleDownArrow = _this.handleDownArrow.bind(_assertThisInitialized(_this));
    _this.handleEscape = _this.handleEscape.bind(_assertThisInitialized(_this));
    _this.handleReturn = _this.handleReturn.bind(_assertThisInitialized(_this));
    _this.handleTab = _this.handleTab.bind(_assertThisInitialized(_this));
    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    _this.handleSelectItem = _this.handleSelectItem.bind(_assertThisInitialized(_this));
    _this.handleIndexChange = _this.handleIndexChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = MenuButton.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.activateMenuItem(this.props.selectedIndex);
    }
  };

  _proto.commitSelection = function commitSelection(index) {
    this.setState({
      activateIndex: index,
      active: false
    });
    this.handleIndexChange(index);
  };

  _proto.activateMenuItem = function activateMenuItem(index) {
    this.setState({
      activateIndex: index
    });
    this.handleIndexChange(index);
  };

  _proto.handleIndexChange = function handleIndexChange(index) {
    var onSelectItem = this.props.onSelectItem;
    onSelectItem(index);
  };

  _proto.handleClick = function handleClick() {
    this.setState(function (prevState) {
      return {
        active: !prevState.active
      };
    });
  };

  _proto.handleFocus = function handleFocus() {
    document.addEventListener('keydown', this.handleKeyPress);
  };

  _proto.handleBlur = function handleBlur() {
    this.setState({
      active: false
    });
    document.removeEventListener('keydown', this.handleKeyPress);
  };

  _proto.handleUpArrow = function handleUpArrow(e) {
    var items = this.props.items;

    if (this.state.active) {
      e.preventDefault();
      var newIndex = this.state.activateIndex - 1;

      if (newIndex < 0) {
        newIndex = items.length ? items.length - 1 : 0;
      }

      this.activateMenuItem(newIndex);
    }
  };

  _proto.handleDownArrow = function handleDownArrow(e) {
    var items = this.props.items;

    if (this.state.active) {
      e.preventDefault();
      var newIndex = this.state.activateIndex + 1;

      if (newIndex >= items.length) {
        newIndex = 0;
      }

      this.activateMenuItem(newIndex);
    }
  };

  _proto.handleTab = function handleTab(e) {
    if (this.state.active) {
      e.preventDefault();
      this.commitSelection(this.state.activateIndex);
    }
  };

  _proto.handleReturn = function handleReturn(e) {
    e.preventDefault();

    if (this.state.active) {
      this.commitSelection(this.state.activateIndex);
    } else {
      this.setState({
        active: true
      });
    }
  };

  _proto.handleEscape = function handleEscape() {
    this.setState({
      active: false,
      activateIndex: 0
    });
  };

  _proto.handleKeyPress = function handleKeyPress(event) {
    // Escape (27) key
    if (event.which === 27) {
      this.handleEscape(event);
    } else if (event.which === 9) {
      // Tab (9) key
      this.handleTab(event);
    } else if (event.which === 13) {
      // Enter (13) key
      this.handleReturn(event);
    } else if (event.which === 38) {
      // Up (38) key
      this.handleUpArrow(event);
    } else if (event.which === 40) {
      // Down (40) key press
      this.handleDownArrow(event);
    }
  };

  _proto.handleSelectItem = function handleSelectItem(i) {
    this.commitSelection(i);
  };

  _proto.renderMenu = function renderMenu() {
    var _this2 = this;

    if (!this.state.active) {
      return null;
    }

    var items = this.props.items;
    return React.createElement(Menu, null, items.map(function (item, i) {
      return React.createElement(MenuItem, {
        item: item,
        index: i,
        onSelectItem: _this2.handleSelectItem,
        activateIndex: _this2.state.activateIndex,
        key: "item-" + i++
      });
    }));
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        inline = _this$props.inline,
        className = _this$props.className;
    return React.createElement(ClickableComponent, {
      className: classNames(className, {
        'video-react-menu-button-inline': !!inline,
        'video-react-menu-button-popup': !inline,
        'video-react-menu-button-active': this.state.active
      }, 'video-react-control video-react-button video-react-menu-button'),
      role: "button",
      tabIndex: "0",
      ref: function ref(c) {
        _this3.menuButton = c;
      },
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    }, this.props.children, this.renderMenu());
  };

  return MenuButton;
}(Component);
MenuButton.propTypes = propTypes$q;
MenuButton.displayName = 'MenuButton';

var propTypes$r = {
  player: PropTypes.object,
  actions: PropTypes.object,
  rates: PropTypes.array,
  className: PropTypes.string
};
var defaultProps$7 = {
  rates: [2, 1.5, 1.25, 1, 0.5, 0.25]
};

var PlaybackRateMenuButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PlaybackRateMenuButton, _Component);

  function PlaybackRateMenuButton(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    _this.handleSelectItem = _this.handleSelectItem.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PlaybackRateMenuButton.prototype;

  _proto.handleSelectItem = function handleSelectItem(index) {
    var _this$props = this.props,
        rates = _this$props.rates,
        actions = _this$props.actions;

    if (index >= 0 && index < rates.length) {
      actions.changeRate(rates[index]);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        rates = _this$props2.rates,
        player = _this$props2.player;
    var items = rates.map(function (rate) {
      return {
        label: rate + "x",
        value: rate
      };
    });
    var selectedIndex = rates.indexOf(player.playbackRate) || 0;
    return React.createElement(MenuButton, {
      className: classNames('video-react-playback-rate', this.props.className),
      onSelectItem: this.handleSelectItem,
      items: items,
      selectedIndex: selectedIndex
    }, React.createElement("span", {
      className: "video-react-control-text"
    }, "Playback Rate"), React.createElement("div", {
      className: "video-react-playback-rate-value"
    }, player.playbackRate.toFixed(2) + "x"));
  };

  return PlaybackRateMenuButton;
}(Component);

PlaybackRateMenuButton.propTypes = propTypes$r;
PlaybackRateMenuButton.defaultProps = defaultProps$7;
PlaybackRateMenuButton.displayName = 'PlaybackRateMenuButton';

var propTypes$s = {
  children: PropTypes.any,
  autoHide: PropTypes.bool,
  autoHideTime: PropTypes.number,
  // used in Player
  disableDefaultControls: PropTypes.bool,
  disableCompletely: PropTypes.bool,
  className: PropTypes.string
};
var defaultProps$8 = {
  autoHide: true,
  disableCompletely: false
};

var ControlBar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ControlBar, _Component);

  function ControlBar(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.getDefaultChildren = _this.getDefaultChildren.bind(_assertThisInitialized(_this));
    _this.getFullChildren = _this.getFullChildren.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ControlBar.prototype;

  _proto.getDefaultChildren = function getDefaultChildren() {
    return [React.createElement(PlayToggle, {
      key: "play-toggle",
      order: 1
    }), React.createElement(VolumeMenuButton, {
      key: "volume-menu-button",
      order: 4
    }), React.createElement(CurrentTimeDisplay, {
      key: "current-time-display",
      order: 5.1
    }), React.createElement(TimeDivider, {
      key: "time-divider",
      order: 5.2
    }), React.createElement(DurationDisplay, {
      key: "duration-display",
      order: 5.3
    }), React.createElement(ProgressControl, {
      key: "progress-control",
      order: 6
    }), React.createElement(FullscreenToggle, {
      key: "fullscreen-toggle",
      order: 8
    })];
  };

  _proto.getFullChildren = function getFullChildren() {
    return [React.createElement(PlayToggle, {
      key: "play-toggle",
      order: 1
    }), React.createElement(ReplayControl, {
      key: "replay-control",
      order: 2
    }), React.createElement(ForwardControl, {
      key: "forward-control",
      order: 3
    }), React.createElement(VolumeMenuButton, {
      key: "volume-menu-button",
      order: 4
    }), React.createElement(CurrentTimeDisplay, {
      key: "current-time-display",
      order: 5
    }), React.createElement(TimeDivider, {
      key: "time-divider",
      order: 6
    }), React.createElement(DurationDisplay, {
      key: "duration-display",
      order: 7
    }), React.createElement(ProgressControl, {
      key: "progress-control",
      order: 8
    }), React.createElement(RemainingTimeDisplay, {
      key: "remaining-time-display",
      order: 9
    }), React.createElement(PlaybackRateMenuButton, {
      rates: [1, 1.25, 1.5, 2],
      key: "playback-rate",
      order: 10
    }), React.createElement(FullscreenToggle, {
      key: "fullscreen-toggle",
      order: 11
    })];
  };

  _proto.getChildren = function getChildren() {
    var children = React.Children.toArray(this.props.children);
    var defaultChildren = this.props.disableDefaultControls ? [] : this.getDefaultChildren();

    var _this$props = this.props,
        className = _this$props.className,
        parentProps = _objectWithoutPropertiesLoose(_this$props, ["className"]); // remove className


    return mergeAndSortChildren(defaultChildren, children, parentProps);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        autoHide = _this$props2.autoHide,
        className = _this$props2.className,
        disableCompletely = _this$props2.disableCompletely;
    var children = this.getChildren();
    return disableCompletely ? null : React.createElement("div", {
      className: classNames('video-react-control-bar', {
        'video-react-control-bar-auto-hide': autoHide
      }, className)
    }, children);
  };

  return ControlBar;
}(Component);
ControlBar.propTypes = propTypes$s;
ControlBar.defaultProps = defaultProps$8;
ControlBar.displayName = 'ControlBar';

var USER_AGENT = typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : ''; // const webkitVersionMap = (/AppleWebKit\/([\d.]+)/i).exec(USER_AGENT);
// const appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;

/*
 * Device is an iPhone
 *
 * @type {Boolean}
 * @constant
 * @private
 */

var IS_IPAD = /iPad/i.test(USER_AGENT); // The Facebook app's UIWebView identifies as both an iPhone and iPad, so
// to identify iPhones, we need to exclude iPads.
// http://artsy.github.io/blog/2012/10/18/the-perils-of-ios-user-agent-sniffing/

var IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD;
var IS_IPOD = /iPod/i.test(USER_AGENT);
var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;

var propTypes$t = {
  children: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fluid: PropTypes.bool,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
  videoId: PropTypes.string,
  startTime: PropTypes.number,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  src: PropTypes.string,
  poster: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
  onLoadStart: PropTypes.func,
  onWaiting: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeeked: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onProgress: PropTypes.func,
  onDurationChange: PropTypes.func,
  onError: PropTypes.func,
  onSuspend: PropTypes.func,
  onAbort: PropTypes.func,
  onEmptied: PropTypes.func,
  onStalled: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadedData: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onRateChange: PropTypes.func,
  onVolumeChange: PropTypes.func,
  store: PropTypes.object
};
var defaultProps$9 = {
  fluid: true,
  muted: false,
  playsInline: false,
  preload: 'auto',
  aspectRatio: 'auto'
};

var Player =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Player, _Component);

  function Player(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.controlsHideTimer = null;
    _this.video = null; // the Video component

    _this.manager = new Manager(props.store);
    _this.actions = _this.manager.getActions();

    _this.manager.subscribeToPlayerStateChange(_this.handleStateChange.bind(_assertThisInitialized(_this)));

    _this.getStyle = _this.getStyle.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.getChildren = _this.getChildren.bind(_assertThisInitialized(_this));
    _this.handleMouseMove = throttle(_this.handleMouseMove.bind(_assertThisInitialized(_this)), 250);
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.startControlsTimer = _this.startControlsTimer.bind(_assertThisInitialized(_this));
    _this.handleFullScreenChange = _this.handleFullScreenChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Player.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    fullscreen.addEventListener(this.handleFullScreenChange);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Remove event listener
    window.removeEventListener('resize', this.handleResize);
    fullscreen.removeEventListener(this.handleFullScreenChange);

    if (this.controlsHideTimer) {
      window.clearTimeout(this.controlsHideTimer);
    }
  };

  _proto.getDefaultChildren = function getDefaultChildren(originalChildren) {
    var _this2 = this;

    return [React.createElement(Video, {
      ref: function ref(c) {
        _this2.video = c;
        _this2.manager.video = _this2.video;
      },
      key: "video",
      order: 0.0
    }, originalChildren), React.createElement(PosterImage, {
      key: "poster-image",
      order: 1.0
    }), React.createElement(LoadingSpinner, {
      key: "loading-spinner",
      order: 2.0
    }), React.createElement(Bezel, {
      key: "bezel",
      order: 3.0
    }), React.createElement(BigPlayButton, {
      key: "big-play-button",
      order: 4.0
    }), React.createElement(ControlBar, {
      key: "control-bar",
      order: 5.0
    }), React.createElement(Shortcut, {
      key: "shortcut",
      order: 99.0
    })];
  };

  _proto.getChildren = function getChildren(props) {
    var _ = props.className,
        originalChildren = props.children,
        propsWithoutChildren = _objectWithoutPropertiesLoose(props, ["className", "children"]);

    var children = React.Children.toArray(this.props.children).filter(function (e) {
      return !isVideoChild(e);
    });
    var defaultChildren = this.getDefaultChildren(originalChildren);
    return mergeAndSortChildren(defaultChildren, children, propsWithoutChildren);
  };

  _proto.setWidthOrHeight = function setWidthOrHeight(style, name, value) {
    var _Object$assign;

    var styleVal;

    if (typeof value === 'string') {
      if (value === 'auto') {
        styleVal = 'auto';
      } else if (value.match(/\d+%/)) {
        styleVal = value;
      }
    } else if (typeof value === 'number') {
      styleVal = value + "px";
    }

    Object.assign(style, (_Object$assign = {}, _Object$assign[name] = styleVal, _Object$assign));
  };

  _proto.getStyle = function getStyle() {
    var _this$props = this.props,
        fluid = _this$props.fluid,
        propsAspectRatio = _this$props.aspectRatio,
        propsHeight = _this$props.height,
        propsWidth = _this$props.width;

    var _this$manager$getStat = this.manager.getState(),
        player = _this$manager$getStat.player;

    var style = {};
    var width;
    var height;
    var aspectRatio; // The aspect ratio is either used directly or to calculate width and height.

    if (propsAspectRatio !== undefined && propsAspectRatio !== 'auto') {
      // Use any aspectRatio that's been specifically set
      aspectRatio = propsAspectRatio;
    } else if (player.videoWidth) {
      // Otherwise try to get the aspect ratio from the video metadata
      aspectRatio = player.videoWidth + ":" + player.videoHeight;
    } else {
      // Or use a default. The video element's is 2:1, but 16:9 is more common.
      aspectRatio = '16:9';
    } // Get the ratio as a decimal we can use to calculate dimensions


    var ratioParts = aspectRatio.split(':');
    var ratioMultiplier = ratioParts[1] / ratioParts[0];

    if (propsWidth !== undefined) {
      // Use any width that's been specifically set
      width = propsWidth;
    } else if (propsHeight !== undefined) {
      // Or calulate the width from the aspect ratio if a height has been set
      width = propsHeight / ratioMultiplier;
    } else {
      // Or use the video's metadata, or use the video el's default of 300
      width = player.videoWidth || 400;
    }

    if (propsHeight !== undefined) {
      // Use any height that's been specifically set
      height = propsHeight;
    } else {
      // Otherwise calculate the height from the ratio and the width
      height = width * ratioMultiplier;
    }

    if (fluid) {
      style.paddingTop = ratioMultiplier * 100 + "%";
    } else {
      // If Width contains "auto", set "auto" in style
      this.setWidthOrHeight(style, 'width', width);
      this.setWidthOrHeight(style, 'height', height);
    }

    return style;
  } // get redux state
  // { player, operation }
  ;

  _proto.getState = function getState() {
    return this.manager.getState();
  } // get playback rate
  ;

  // play the video
  _proto.play = function play() {
    this.video.play();
  } // pause the video
  ;

  _proto.pause = function pause() {
    this.video.pause();
  } // Change the video source and re-load the video:
  ;

  _proto.load = function load() {
    this.video.load();
  } // Add a new text track to the video
  ;

  _proto.addTextTrack = function addTextTrack() {
    var _this$video;

    (_this$video = this.video).addTextTrack.apply(_this$video, arguments);
  } // Check if your browser can play different types of video:
  ;

  _proto.canPlayType = function canPlayType() {
    var _this$video2;

    (_this$video2 = this.video).canPlayType.apply(_this$video2, arguments);
  } // seek video by time
  ;

  _proto.seek = function seek(time) {
    this.video.seek(time);
  } // jump forward x seconds
  ;

  _proto.forward = function forward(seconds) {
    this.video.forward(seconds);
  } // jump back x seconds
  ;

  _proto.replay = function replay(seconds) {
    this.video.replay(seconds);
  } // enter or exist full screen
  ;

  _proto.toggleFullscreen = function toggleFullscreen() {
    this.video.toggleFullscreen();
  } // subscribe to player state change
  ;

  _proto.subscribeToStateChange = function subscribeToStateChange(listener) {
    return this.manager.subscribeToPlayerStateChange(listener);
  } // player resize
  ;

  _proto.handleResize = function handleResize() {};

  _proto.handleFullScreenChange = function handleFullScreenChange(event) {
    if (event.target === this.manager.rootElement) {
      this.actions.handleFullscreenChange(fullscreen.isFullscreen);
    }
  };

  _proto.handleMouseDown = function handleMouseDown() {
    this.startControlsTimer();
  };

  _proto.handleMouseMove = function handleMouseMove() {
    this.startControlsTimer();
  };

  _proto.handleKeyDown = function handleKeyDown() {
    this.startControlsTimer();
  };

  _proto.startControlsTimer = function startControlsTimer() {
    var _this3 = this;

    var controlBarActiveTime = 3000;
    React.Children.forEach(this.props.children, function (element) {
      if (!React.isValidElement(element) || element.type !== ControlBar) {
        return;
      }

      var autoHideTime = element.props.autoHideTime;

      if (typeof autoHideTime === 'number') {
        controlBarActiveTime = autoHideTime;
      }
    });
    this.actions.userActivate(true);
    clearTimeout(this.controlsHideTimer);
    this.controlsHideTimer = setTimeout(function () {
      _this3.actions.userActivate(false);
    }, controlBarActiveTime);
  };

  _proto.handleStateChange = function handleStateChange(state, prevState) {
    if (state.isFullscreen !== prevState.isFullscreen) {
      this.handleResize(); // focus root when switching fullscreen mode to avoid confusion #276

      focusNode(this.manager.rootElement);
    }

    this.forceUpdate(); // re-render
  };

  _proto.handleFocus = function handleFocus() {
    this.actions.activate(true);
  };

  _proto.handleBlur = function handleBlur() {
    this.actions.activate(false);
  };

  _proto.render = function render() {
    var _this4 = this;

    var fluid = this.props.fluid;

    var _this$manager$getStat2 = this.manager.getState(),
        player = _this$manager$getStat2.player;

    var paused = player.paused,
        hasStarted = player.hasStarted,
        waiting = player.waiting,
        seeking = player.seeking,
        isFullscreen = player.isFullscreen,
        userActivity = player.userActivity;

    var props = _extends({}, this.props, {
      player: player,
      actions: this.actions,
      manager: this.manager,
      store: this.manager.store,
      video: this.video ? this.video.video : null
    });

    var children = this.getChildren(props);
    return React.createElement("div", {
      className: classNames({
        'video-react-controls-enabled': true,
        'video-react-has-started': hasStarted,
        'video-react-paused': paused,
        'video-react-playing': !paused,
        'video-react-waiting': waiting,
        'video-react-seeking': seeking,
        'video-react-fluid': fluid,
        'video-react-fullscreen': isFullscreen,
        'video-react-user-inactive': !userActivity,
        'video-react-user-active': userActivity,
        'video-react-workinghover': !IS_IOS
      }, 'video-react', this.props.className),
      style: this.getStyle(),
      ref: function ref(c) {
        _this4.manager.rootElement = c;
      },
      role: "region",
      onTouchStart: this.handleMouseDown,
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: "-1"
    }, children);
  };

  _createClass(Player, [{
    key: "playbackRate",
    get: function get() {
      return this.video.playbackRate;
    } // set playback rate
    // speed of video
    ,
    set: function set(rate) {
      this.video.playbackRate = rate;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.video.muted;
    },
    set: function set(val) {
      this.video.muted = val;
    }
  }, {
    key: "volume",
    get: function get() {
      return this.video.volume;
    },
    set: function set(val) {
      this.video.volume = val;
    } // video width

  }, {
    key: "videoWidth",
    get: function get() {
      return this.video.videoWidth;
    } // video height

  }, {
    key: "videoHeight",
    get: function get() {
      return this.video.videoHeight;
    }
  }]);

  return Player;
}(Component);
Player.contextTypes = {
  store: PropTypes.object
};
Player.propTypes = propTypes$t;
Player.defaultProps = defaultProps$9;
Player.displayName = 'Player';

var PlaybackRate =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PlaybackRate, _Component);

  function PlaybackRate(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    deprecatedWarning('PlaybackRate', 'PlaybackRateMenuButton');
    return _this;
  }

  var _proto = PlaybackRate.prototype;

  _proto.render = function render() {
    return React.createElement(PlaybackRateMenuButton, this.props);
  };

  return PlaybackRate;
}(Component);
PlaybackRate.displayName = 'PlaybackRate';

export { Bezel, BigPlayButton, ControlBar, CurrentTimeDisplay, DurationDisplay, ForwardControl, FullscreenToggle, LoadProgressBar, LoadingSpinner, MenuButton, MouseTimeDisplay, PlayProgressBar, PlayToggle, PlaybackRate, PlaybackRateMenuButton, Player, PosterImage, ProgressControl, RemainingTimeDisplay, ReplayControl, SeekBar, Shortcut, Slider, TimeDivider, Video, VolumeMenuButton, operationReducer, playerActions, playerReducer, videoActions };
//# sourceMappingURL=video-react.es.js.map
