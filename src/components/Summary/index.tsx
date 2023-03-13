import { ArrowCircleDown, ArrowCircleUp, CurrencyEur } from "phosphor-react";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../utils/formatter";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
    const summary = useSummary();
    
    return(
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Income</span>
                    <ArrowCircleUp size={32} color="#00B37E"/>
                </header>
                <strong>{priceFormatter.format(summary.income)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Outcome</span>
                    <ArrowCircleDown size={32} color="#F75A68"/>
                </header>
                <strong>{priceFormatter.format(summary.outcome)}</strong>
            </SummaryCard>

            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyEur size={32} color="#FFF"/>
                </header>
                <strong>{priceFormatter.format(summary.total)}</strong>
            </SummaryCard>

        </SummaryContainer>
    );
}