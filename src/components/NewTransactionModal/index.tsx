import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionContext } from '../../contexts/TransactionsContext';

const newTransactionsFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionContext)

    const {
        control,
        register,
        handleSubmit,
        formState: {isSubmitting},
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionsFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const { description, price, category, type } = data;

        await createTransaction({
            description,
            price,
            category,
            type
        })

        reset();
    }

    return(
        <Dialog.Portal>
            <Overlay /> 
            <Content>
                <Dialog.Title>New Transaction</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input 
                            type="text"
                            placeholder='Description'
                            required
                            {...register('description')}
                        />
                        <input 
                            type="number"
                            placeholder='Price'
                            required
                            {...register('price', { valueAsNumber: true })}
                        />
                        <input 
                            type="text"
                            placeholder='Category'
                            required
                            {...register('category')}
                        />

                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => {
                                return (
                                    <TransactionType onValueChange={field.onChange} value={field.value}>
                                        <TransactionTypeButton variant="income" value='income'>
                                            <ArrowCircleUp size={24} />
                                            Income
                                        </TransactionTypeButton>

                                        <TransactionTypeButton variant="outcome" value='outcome'>
                                            <ArrowCircleDown size={24} />
                                            Outcome
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }}
                        />

                        <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                    </form>
            </Content>
        </Dialog.Portal>
    );
}