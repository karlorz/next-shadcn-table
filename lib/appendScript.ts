export const appendScript = (scriptToAppend: string): void => {
  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
}