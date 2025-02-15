const random = (len: number) => {
  let options = "qwertyuiop1234567890";
  let length = options.length;

  let ans = "";

  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * length)];
  }
  return ans;
};

export default random;
