export const ERROR_MESSAGES_MAP: { [key: string]: string } = {
  'Invalid license plate': 'A placa informada não é válida ou está em um formato incorreto.',
  'Invalid CPF': 'O CPF informado não é válido. Verifique se digitou todos os números corretamente.',
  'Invalid rental period: End date must be after start date.': 'O período de aluguel é inválido: A data de devolução deve ser posterior à data de retirada.',
  'Invalid rental period: The interval cannot be longer than 60 days.': 'O período de aluguel é muito longo. O intervalo máximo permitido é de 60 dias.',
  'The return date cannot be earlier than the rental start date.': 'A data de devolução não pode ser anterior à data de retirada.',
  'A car with this license plate already exists.': 'Já existe um carro cadastrado com esta placa. Verifique a placa e tente novamente.',
  'A customer with this CPF already exists.': 'Já existe um cliente cadastrado com este CPF. Utilize outro CPF ou verifique o cadastro existente.',
  
  '400': 'Sua solicitação está incompleta ou inválida. Verifique os dados no formulário e tente novamente.',
  '401': 'Não autorizado. Sua sessão pode ter expirado. Por favor, faça login novamente.',
  '404': 'O recurso solicitado não foi encontrado (404).',
  '409': 'Houve um conflito de dados. O item que você está tentando criar já existe.',
  '500': 'Houve um erro interno no servidor. Por favor, tente novamente ou entre em contato com o suporte.',
};

export const ERRORS_WITHOUT_DYNAMIC_VALUE: string[] = [
  'A car with this license plate already exists.',
  'A customer with this CPF already exists.',
  'Invalid rental period: End date must be after start date.',
  'Invalid rental period: The interval cannot be longer than 60 days.',
  'The return date cannot be earlier than the rental start date.',
];