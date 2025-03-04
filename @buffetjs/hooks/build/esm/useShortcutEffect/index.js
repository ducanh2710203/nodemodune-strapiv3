import { useEffect, useRef } from 'react';
import useActiveKeys from '../useActiveKeys';
var keyCodes = {
  alt: 18,
  arrowup: 38,
  arrowdown: 40,
  enter: 13,
  f: 70,
  tab: 9
};

function getShortcutKeys(keys) {
  return keys.split('+').map(function (value) {
    return keyCodes[value.toLowerCase()];
  });
}

function useShortcutEffect(shortcut, listener) {
  var isEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var activeKeys = useActiveKeys(isEnabled);
  var listenerRef = useRef();
  listenerRef.current = listener;
  useEffect(function () {
    var match = getShortcutKeys(shortcut).every(function (key) {
      return activeKeys.includes(key);
    });

    if (match) {
      listenerRef.current();
    }
  }, [activeKeys, shortcut]);
}

export default useShortcutEffect;