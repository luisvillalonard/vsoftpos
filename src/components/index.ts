
/* Titles */
import { TitlePage } from "../components/titles"
import { useButtons } from "./buttons"
import { useContainers } from "./containers"
import { useImages } from "./images"
import { useInputs } from "./inputs"
import { useLayout } from "./layout"
import { useProviders } from "./providers"

export function useComponents() {

    const { ButtonDefault, ButtonPrimary, ButtonDanger, ButtonEdit } = useButtons()
    const { Container, FormDrawer, Loading, PanelPos } = useContainers()
    const { Imagen } = useImages()
    const { Searcher } = useInputs()
    const { HeaderApp, MenuApp, RutasApp } = useLayout()
    const { ContextsProviders, StyleProvider } = useProviders()

    return {

        /* Buttons */
        ButtonDefault,
        ButtonPrimary,
        ButtonDanger,
        ButtonEdit,

        /* Containers */
        Container,
        FormDrawer,
        Loading,
        PanelPos,

        /* Images */
        Imagen,

        /* Inputs */
        Searcher,

        /* Layout */
        HeaderApp,
        MenuApp,
        RutasApp,

        /* Providers */
        ContextsProviders,
        StyleProvider,

        /* Titles */
        TitlePage,

    }

}