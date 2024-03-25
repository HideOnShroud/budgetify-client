import { Box } from "@chakra-ui/react";
import { ReactComponentElement } from "react";

interface Props {
    icon: ReactComponentElement<any> | String
}

const CircularIcon = ({ icon }: Props) => {
    return (
        <Box
            bgColor={"#f9f9f9"}
            borderRadius={'full'}
            color={"#B9E2E6"}>
            {icon}</Box>
    );
}

export default CircularIcon;