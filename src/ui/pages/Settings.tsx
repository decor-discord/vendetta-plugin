import { React, url } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, General } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { DISCORD_SERVER_INVITE } from "../../lib/constants";
import { fetchUsers } from "../../lib/users";
import { findByProps } from "@vendetta/metro";

const { ScrollView } = General;
const { FormSection, FormRow } = Forms;

const { triggerHapticFeedback, HapticFeedbackTypes } = findByProps("triggerHapticFeedback");

export default function Settings() {
    const [debug, setDebug] = React.useState(false)
    return (<ScrollView>
        <FormSection>
            <FormRow
                label="Discord Server"
                leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                trailing={FormRow.Arrow}
                onPress={() => url.openDeeplink(DISCORD_SERVER_INVITE)}
                onLongPress={() => {
                    triggerHapticFeedback(HapticFeedbackTypes.IMPACT_LIGHT);
                    setDebug(true);
                }}
            />
        </FormSection>
        {debug &&
            <FormSection title="Debug">
                <FormRow
                    label="Reload Users Map"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_message_retry")} />}
                    onPress={() => fetchUsers("reload").then(() => showToast("Reloaded Users Map", getAssetIDByName("Check")))}
                />
            </FormSection>
        }
    </ScrollView>)
}
