const regras = {
  isCpf: (value) => /^\d{3}\.\d{3}\.\d{3}\d{2}$/.test(value),
  isCnpf: (value) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\d{2}$/.test(value),
  isEmail: (value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ),
  isWord: (value) => /^[a-zA-Z]+$/g.test(value),
  isPhone: (value) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(value),
  isCep: (value) => /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/.test(value),
};

export default regras;
