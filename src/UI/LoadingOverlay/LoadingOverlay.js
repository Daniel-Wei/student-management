import LoadingOverlayModule from './LoadingOverlay.module.css';

function LoadingOverlay({ text = "Loading…" }) {
  return (
    <div className={LoadingOverlayModule.loadingOverlay}>
      <div className={LoadingOverlayModule.loader}></div>
      <p>{text}</p>
    </div>
  );
}

export default LoadingOverlay;
