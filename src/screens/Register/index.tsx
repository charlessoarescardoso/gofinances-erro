import React, { useState } from 'react';
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert, 
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/forms/Button';
import { CategorySelectButton } from '../../components/forms/CategorySelectButton';
import { Input } from '../../components/forms/Input';
import { InputForm } from '../../components/forms/inputForm';
import { TransactionTypeButton } from '../../components/forms/TransactionTypeButton';
import { CategorySelect } from '../CatergorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
 } from './style';

 import * as Yup from 'yup';
 import { yupResolver } from '@hookform/resolvers/yup';

 interface FormData {
     name: string;
     amount: string;
 }

 const schema = Yup.object().shape({
    name: Yup.string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor')
    .positive('Não pode ser negativo')
    .required('Valor Obrigatório')
 });

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        
        if(category.key ==='category')
            return Alert.alert('Selecione a categoria');

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control} 
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control} 
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            
                            <TransactionTypeButton 
                                type="up"
                                title="Entrada"
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            
                            <TransactionTypeButton 
                                type="down"
                                title="Saida"
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionsTypes>
                        <CategorySelectButton 
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                            
                        />
                                            
                    </Fields>
                    <Button 
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                    
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal} 
                    
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}