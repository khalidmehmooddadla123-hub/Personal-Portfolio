let _id = 0, _setter = null;
export function toast(message, type = "info", dur = 4200) {
  if (!_setter) return;
  const id = ++_id;
  _setter(prev => [...prev, { id, message, type }]);
  setTimeout(() => _setter(prev => prev.filter(t => t.id !== id)), dur);
}
toast.success = m => toast(m, "success");
toast.error   = m => toast(m, "error");
toast.info    = m => toast(m, "info");
export function _registerToastSetter(fn) { _setter = fn; }
