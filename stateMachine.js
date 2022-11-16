const EOF = Symbol("EOF");

const succeed = () => {
  throw Error("illegal call");
};

const failed = () => failed;

const receivedDot = (char) => {
  if (/^[0-9]$/.test(char)) {
    return waitingForNumber;
  }
  return failed
};

const receivedZero = (char) => {
  if (char === EOF) {
    return succeed;
  }
  if(char === '.'){
    return receivedDot
  }
  return failed;
};

const waitingForNumber = (char) => {
  if (char === EOF) {
    return succeed;
  }
  if (/^[0-9]$/.test(char)) {
    return waitingForNumber;
  }
  return failed;
};

const waitingForNumberOrDot = (char) => {
  if (char === EOF) {
    return succeed;
  }
  if(char === '.'){
    return waitingForNumber
  }
  if (/^[0-9]$/.test(char)) {
    return waitingForNumberOrDot;
  }
  return failed;
}

const start = (char) => {
  if (char === ".") {
    return receivedDot;
  }
  if (char === "0") {
    return receivedZero;
  }
  if (/^[1-9]$/.test(char)) {
    return waitingForNumberOrDot;
  }
  return failed;
};

const checkDecimal = (str) => {
  console.log(str)
  let state = start;
  if (!str.length) {
    return false;
  }
  for (const char of str) {
    console.log(state.name, char)
    state = state(char);
  }
  state = state(EOF);
  if (state === succeed) {
    return true;
  }
  if (state === failed) {
    return false;
  }
};


['123','.123','..123','1.23.'].forEach(t => {
  console.log(checkDecimal(t))
})
