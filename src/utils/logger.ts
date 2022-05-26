import "colors";

const logger = {
  basic: (...params: any[]): void => {
    console.log(...params);
  },

  info: (...params: any[]): void =>
    console.log(
      `[${new Date().toISOString()}]`.blue,
      String(...params)
    ),

  error: (...params: any[]): void =>
    console.error(
      `[SERVER ERROR][${new Date().toISOString()}]`.red,
      ...params
    )
};

export default logger;
