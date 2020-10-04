import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

// se encarga de agregar margenes a los costados de la pagina, de forma responsiva
// uso prop spreading en este caso para poder pasarle mas propiedades a chakra desde afuera
const Container: React.FC<BoxProps> = ({ children, ...restProps }) => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        width={[
          "95%", // base
          "90%", // 480px upwards
          "80%", // 768px upwards
          "80%", // 992px upwards
        ]}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Container;
