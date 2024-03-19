import { Grid, GridItem, Heading, Circle, } from "@chakra-ui/react";
import { AccountInterface } from "../entities/AccountInterface";
import { getCookie, setCookie } from 'typescript-cookie'
import { useAccount } from "../store";

interface props {
    accountInfo: AccountInterface

}

const Account = ({ accountInfo }: props) => {
    const setAccountId = useAccount((state) => state.setAccountId)

    const commonGridProps = {
        templateRows: 'repeat(2,0fr)',
        templateColumns: 'repeat(5,1fr)',
        overflow: 'hidden',
        mb: 12,
        p: 4,
        borderRadius: '2xl',
        bgGradient: 'linear(to-br, #FA777F,#E16CD0, #72AFED)',
        textColor: "#F8F8F8",
        maxW: 'md',
        boxShadow: "5px 10px 20px 0px #00000040"
    }

    return (

        <Grid
            {...commonGridProps}
            opacity={accountInfo._id !== getCookie("accountId") ? "40%" : undefined}
            onClick={() => {
                setCookie("accountId", accountInfo._id)
                setAccountId(accountInfo._id)

            }}
        >
            <GridItem rowSpan={1} colSpan={3}>
                <Heading
                    pb={5}
                    size="xl"
                    fontWeight="sm"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {accountInfo.title}
                </Heading>
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
                <Heading
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontWeight="sm"
                    pb={6}
                    size="3xl"
                >
                    {accountInfo.balance}
                </Heading>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} rowStart={1} colStart={5}>
                <Circle bg="white" padding="12px 25px 12px 25px">
                    <Heading
                        bgGradient="linear(to-br, #FA777F,#E16CD0, #72AFED)"
                        bgClip="text"
                        fontWeight={400}
                        size="3xl"
                    >
                        {accountInfo.currency}
                    </Heading>
                </Circle>
            </GridItem>
        </Grid>

    )
}

export default Account;