export type LocaleTextType = typeof ptBr;

export const ptBr = {
    components: {
        Navbar: {
            themeToggleButton: {
                lightModeText: 'Modo Claro',
                darkModeText: 'Modo Escuro',
            },
            ProfileMenu: {
                functions: {
                    getAccessLevelText: {
                        profileId1: 'Admin',
                        profileId2: 'Padrão',
                        default: 'Indefinido'
                    },
                },
                tooltipTitle: 'Meu Perfil',
                nameTitle: 'Nome',
                accessLevelTitle: 'Nível de Acesso',
                languageTitle: 'Idioma',
                settingsTitle: 'Configurações',
                profileButtonText: 'Perfil',
                signOutButtonText: 'Sair',
            }
        },
        Sidebar: {
            header: { title: 'Chamados OS' },
            tabs: {
                tickets: { label: 'Chamados' },
                clients: { label: 'Clientes' },
            },
            footer: {
                linkedin: 'LinkedIn',
                github: 'GitHub',
                contact: 'Contato',
                contactInfoToast: 'Email de contato copiado para área de transferência!',
            },
        }
    },
    context: {
        Auth: {
            functions: {
                signIn: {
                    errorToastTextUserNotFound: 'Usuário não encontrado!',
                    errorToastTextWrongPassword: 'Senha Incorreta!',
                    errorToastText: 'Erro ao logar:'
                }
            }
        }
    },
    pages: {
        AddCustomer: {
            functions: {
                addCustomer: {
                    successToastText: 'Cliente Adicionado!',
                    errorToastText: 'Erro ao adicionar cliente!'
                },
            },
            defaultContainerTitle: 'Adicionar Cliente',
            defaultContainerSubtitle: 'Adicione um novo cliente',
            nameInputLabel: 'Nome',
            nameInputPlaceholder: 'Nome Do Cliente',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'emaildocliente@email.com',
            addButtonText: 'Adicionar',
        },
        AddTicket: {
            functions: {
                addTicket: {
                    successToastText: 'Chamado Adicionado!',
                    errorToastText: 'Erro ao adicionar chamado!'
                },
                getCustomers: {
                    errorToastText: 'Erro ao buscar clientes'
                },
            },
            defaultContainerTitle: 'Adicionar Chamado',
            defaultContainerSubtitle: 'Abra um novo chamado',
            clientSelectLabel: 'Cliente',
            subjectInputLabel: 'Assunto',
            subjectInputPlaceholder: 'Assunto do Chamado',
            descriptionInputLabel: 'Descrição',
            descriptionInputPlaceholder: 'Descrição detalhada do ocorrido...',
            addButtonText: 'Adicionar',
        },
        Customers: {
            functions: {
                getCustomers: {
                    errorToastText: 'Erro ao buscar clientes'
                },
            },
            defaultContainerTitle: 'Clientes',
            defaultContainerSubtitle: 'Visualize e gerencie seus clientes',
            addButton: 'Adicionar Cliente',
            DataGridMui: {
                nameColumn: { headerName: 'Nome' },
                emailColumn: { headerName: 'Email' },
                actionsColumn: {
                    headerName: 'Ações',
                    editTicketButtonTooltipTitle: 'Editar Cliente'
                },
            },
            refreshButtonTooltipTitle: 'Atualizar'
        },
        EditCustomer: {
            functions: {
                editClient: {
                    successToastText: 'Cliente Editado!',
                    errorToastText: 'Erro ao editar cliente!'
                },
                getClientInfo: {
                    errorToastTextNotFound: 'Cliente não encontrado!',
                    errorToastText: 'Erro ao carregar dados do cliente!'
                },
            },
            defaultContainerTitle: 'Editar Cliente',
            defaultContainerSubtitle: 'Edite os dados de seu cliente',
            nameInputLabel: 'Nome',
            nameInputPlaceholder: 'Nome Do Cliente',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'emaildocliente@email.com',
            editButtonText: 'Editar',
        },
        EditTicket: {
            functions: {
                editTicket: {
                    successToastText: 'Chamado Editado!',
                    errorToastText: 'Erro ao editar chamado!'
                },
                getTicketInfo: {
                    errorToastTextNotFound: 'Chamado não encontrado!',
                    errorToastText: 'Erro ao carregar dados do chamado!'
                },
            },
            defaultContainerTitle: 'Editar Chamado',
            defaultContainerSubtitle: 'Atualize as informações do chamado',
            clientSelectLabel: 'Cliente',
            subjectInputLabel: 'Assunto',
            subjectInputPlaceholder: 'Assunto do Chamado',
            descriptionInputLabel: 'Descrição',
            descriptionInputPlaceholder: 'Descrição detalhada do ocorrido...',
            editButtonText: 'Editar',
        },
        Login: {
            title: 'Login',
            subtitle: 'Chamados OS',
            adminUserText: 'Usuário Admin',
            normalUserText: 'Usuário Padrão',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'seu@email.com',
            passwordInputLabel: 'Senha',
            passwordInputPlaceholder: '******',
            signInButtonText: 'Entrar',
            language: 'Idioma',
        },
        NotFound: {
            title: '404 Not Found',
            subtitle: 'Parece que a página que você estava procurando não existe :/',
            backToHomeButtonText: 'Voltar Para Home',
        },
        Profile: {
            functions: {
                getAccessLevelText: {
                    profileId1: 'Admin',
                    profileId2: 'Padrão',
                    default: 'Indefinido'
                },
            },
            defaultContainerTitle: 'Perfil',
            CardsGrid: {
                nameCard: { headerName: 'Nome' },
                emailCard: { headerName: 'Email' },
                accessLevelCard: { headerName: 'Nível de Acesso' },
            },
        },
        TicketInfo: {
            functions: {
                getTicketInfo: {
                    errorToastTextNotFound: 'Chamado não encontrado!',
                    errorToastText: 'Erro ao carregar dados do chamado!'
                },
            },
            defaultContainerTitle: 'Detalhes do Chamado',
            CardsGrid: {
                statusCard: {
                    headerName: 'Status',
                    valueOptions: {
                        value0Label: 'Encerrado',
                        value1Label: 'Aberto',
                        value2Label: 'Em Atendimento',
                    }
                },
                clientNameCard: { headerName: 'Cliente' },
                createdAtCard: { headerName: 'Data de Criação' },
                updatedAtCard: { headerName: 'Última Atualização' },
                subjectCard: { headerName: 'Assunto' },
                descriptionCard: { headerName: 'Descrição' },
            },
        },
        Tickets: {
            functions: {
                getTickets: {
                    errorToastText: 'Erro ao buscar tickets'
                },
                editStatus: {
                    errorToastText: 'Erro ao editar status'
                },
            },
            defaultContainerTitle: 'Chamados',
            defaultContainerSubtitle: 'Visualize e gerencie os chamados existentes',
            addButton: 'Adicionar Chamado',
            obsText: 'Obs: Clique duas vezes no "Status" do chamado para alterá-lo.',
            DataGridMui: {
                clientNameColumn: { headerName: 'Nome' },
                subjectColumn: { headerName: 'Assunto' },
                createdAtColumn: { headerName: 'Data de Criação' },
                updatedAtColumn: { headerName: 'Última Atualização' },
                statusColumn: {
                    headerName: 'Status',
                    valueOptions: {
                        value0Label: 'Encerrado',
                        value1Label: 'Aberto',
                        value2Label: 'Em Atendimento',
                    }
                },
                actionsColumn: {
                    headerName: 'Ações',
                    ticketInfoButtonTooltipTitle: 'Detalhes do Ticket',
                    editTicketButtonTooltipTitle: 'Editar Ticket'
                },
            },
            refreshButtonTooltipTitle: 'Atualizar'
        },
    },
}

export const en = {
    components: {
        Navbar: {
            themeToggleButton: {
                lightModeText: 'Light Mode',
                darkModeText: 'Dark Mode',
            },
            ProfileMenu: {
                functions: {
                    getAccessLevelText: {
                        profileId1: 'Admin',
                        profileId2: 'Default',
                        default: 'Undefined'
                    },
                },
                tooltipTitle: 'My Profile',
                nameTitle: 'Name',
                accessLevelTitle: 'Access Level',
                languageTitle: 'Language',
                settingsTitle: 'Settings',
                profileButtonText: 'Profile',
                signOutButtonText: 'Sign Out',
            }
        },
        Sidebar: {
            header: { title: 'Tickets OS' },
            tabs: {
                tickets: { label: 'Tickets' },
                clients: { label: 'Customers' },
            },
            footer: {
                linkedin: 'LinkedIn',
                github: 'GitHub',
                contact: 'Contact Me',
                contactInfoToast: 'Contact email copied to clipboard!',
            },
        }
    },
    context: {
        Auth: {
            functions: {
                signIn: {
                    errorToastTextUserNotFound: 'User not found!',
                    errorToastTextWrongPassword: 'Wrong password!',
                    errorToastText: 'Sign in error:'
                }
            }
        }
    },
    pages: {
        AddCustomer: {
            functions: {
                addCustomer: {
                    successToastText: 'Customer added!',
                    errorToastText: 'Error adding customer!'
                },
            },
            defaultContainerTitle: 'Add Customer',
            defaultContainerSubtitle: 'Add a new customer',
            nameInputLabel: 'Name',
            nameInputPlaceholder: 'Client Name',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'customeremail@email.com',
            addButtonText: 'Add',
        },
        AddTicket: {
            functions: {
                addTicket: {
                    successToastText: 'Ticket Added!',
                    errorToastText: 'Error adding ticket!'
                },
                getCustomers: {
                    errorToastText: 'Error fetching customers'
                },
            },
            defaultContainerTitle: 'Add Ticket',
            defaultContainerSubtitle: 'Add a new ticket',
            clientSelectLabel: 'Customer',
            subjectInputLabel: 'Subject',
            subjectInputPlaceholder: 'Ticket Subject',
            descriptionInputLabel: 'Description',
            descriptionInputPlaceholder: 'Detailed description of what happened...',
            addButtonText: 'Add',
        },
        Customers: {
            functions: {
                getCustomers: {
                    errorToastText: 'Error fetching customers'
                },
            },
            defaultContainerTitle: 'Customers',
            defaultContainerSubtitle: 'View and manage your customers',
            addButton: 'Add Customer',
            DataGridMui: {
                nameColumn: { headerName: 'Name' },
                emailColumn: { headerName: 'Email' },
                actionsColumn: {
                    headerName: 'Actions',
                    editTicketButtonTooltipTitle: 'Edit Customer'
                },
            },
            refreshButtonTooltipTitle: 'Refresh'
        },
        EditCustomer: {
            functions: {
                editClient: {
                    successToastText: 'Customer data updated!',
                    errorToastText: 'Error updating customer data!'
                },
                getClientInfo: {
                    errorToastTextNotFound: 'Customer not found!',
                    errorToastText: 'Error loading customer data!'
                },
            },
            defaultContainerTitle: 'Edit Customer',
            defaultContainerSubtitle: 'Update your customer data',
            nameInputLabel: 'Name',
            nameInputPlaceholder: 'Customer Name',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'customeremail@email.com',
            editButtonText: 'Update',
        },
        EditTicket: {
            functions: {
                editTicket: {
                    successToastText: 'Ticket updated!',
                    errorToastText: 'Error updating ticket!'
                },
                getTicketInfo: {
                    errorToastTextNotFound: 'Ticket not found!',
                    errorToastText: 'Error loading ticket!'
                },
            },
            defaultContainerTitle: 'Edit Ticket',
            defaultContainerSubtitle: 'Update ticket information',
            clientSelectLabel: 'Customer',
            subjectInputLabel: 'Subject',
            subjectInputPlaceholder: 'Ticket Subject',
            descriptionInputLabel: 'Description',
            descriptionInputPlaceholder: 'Detailed description of what happened...',
            editButtonText: 'Update',
        },
        Login: {
            title: 'Login',
            subtitle: 'Ticket OS',
            adminUserText: 'Admin User',
            normalUserText: 'Default User',
            emailInputLabel: 'Email',
            emailInputPlaceholder: 'your@email.com',
            passwordInputLabel: 'Password',
            passwordInputPlaceholder: '******',
            signInButtonText: 'Login',
            language: 'Language',
        },
        NotFound: {
            title: '404 Not Found',
            subtitle: "It looks like the page you were looking for doesn't exist. :/",
            backToHomeButtonText: 'Go back to home',
        },
        Profile: {
            functions: {
                getAccessLevelText: {
                    profileId1: 'Admin',
                    profileId2: 'Default',
                    default: 'Undefined'
                },
            },
            defaultContainerTitle: 'Profile',
            CardsGrid: {
                nameCard: { headerName: 'Name' },
                emailCard: { headerName: 'Email' },
                accessLevelCard: { headerName: 'Access Level' },
            },
        },
        TicketInfo: {
            functions: {
                getTicketInfo: {
                    errorToastTextNotFound: 'Ticket not found!',
                    errorToastText: 'Error loading ticket!'
                },
            },
            defaultContainerTitle: 'Ticket Info',
            CardsGrid: {
                statusCard: {
                    headerName: 'Status',
                    valueOptions: {
                        value0Label: 'Closed',
                        value1Label: 'Open',
                        value2Label: 'In Progress',
                    }
                },
                clientNameCard: { headerName: 'Customer' },
                createdAtCard: { headerName: 'Crated At' },
                updatedAtCard: { headerName: 'Updated At' },
                subjectCard: { headerName: 'Subject' },
                descriptionCard: { headerName: 'Description' },
            },
        },
        Tickets: {
            functions: {
                getTickets: {
                    errorToastText: 'Error loading tickets!'
                },
                editStatus: {
                    errorToastText: 'Error updating the status!'
                },
            },
            defaultContainerTitle: 'Tickets',
            defaultContainerSubtitle: 'View and manage existing tickets',
            addButton: 'Add Ticket',
            obsText: `Note: Double-click on the ticket's "Status" to change it.`,
            DataGridMui: {
                clientNameColumn: { headerName: 'Name' },
                subjectColumn: { headerName: 'Subject' },
                createdAtColumn: { headerName: 'Created At' },
                updatedAtColumn: { headerName: 'updated At' },
                statusColumn: {
                    headerName: 'Status',
                    valueOptions: {
                        value0Label: 'Closed',
                        value1Label: 'Open',
                        value2Label: 'In Progress',
                    }
                },
                actionsColumn: {
                    headerName: 'Actions',
                    ticketInfoButtonTooltipTitle: 'Ticket Info',
                    editTicketButtonTooltipTitle: 'Edit Ticket'
                },
            },
            refreshButtonTooltipTitle: 'Refresh'
        },
    },
}