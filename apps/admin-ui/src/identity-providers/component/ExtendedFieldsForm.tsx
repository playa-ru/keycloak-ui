import IdentityProviderRepresentation from "@keycloak/keycloak-admin-client/lib/defs/identityProviderRepresentation";
import {
    FormGroup,
    Select,
    SelectOption,
    SelectVariant,
    Switch,
    ValidatedOptions,
} from "@patternfly/react-core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HelpItem } from "ui-shared";
import { KeycloakTextInput } from "../../components/keycloak-text-input/KeycloakTextInput";

import { useState } from "react";
import { PasswordInput } from "../../components/password-input/PasswordInput";

type ExtendedFieldsFormProps = {
  providerId: string;
};

export const ExtendedFieldsForm = ({ providerId }: ExtendedFieldsFormProps) => {
  switch (providerId) {
    case "facebook":
      return <FacebookFields />;
    case "github":
      return <GithubFields />;
    case "google":
      return <GoogleFields />;
    case "vk":
      return <VkFields />;
    case "ok":
      return <OkFields />;
    case "mailru":
      return <MailRuFields />;
    case "yandex":
      return <YandexFields />;
    case "esiajcp":
      return <EsiaJcpFields />;
    case "openshift-v3":
    case "openshift-v4":
      return <OpenshiftFields />;
    case "paypal":
      return <PaypalFields />;
    case "stackoverflow":
      return <StackoverflowFields />;
    case "linkedin":
      return <LinkedInFields />;
    default:
      return null;
  }
};

const YandexFields = () => {
  const {t} = useTranslation("identity-providers");
  const {register} = useFormContext();

  return (
    <FormGroup
      label={t("yandex.hostedDomain")}
      labelIcon={
        <HelpItem
          helpText="identity-providers-help:yandex:hostedDomain"
          fieldLabelId="identity-providers:yandex:hostedDomain"
        />
      }
      fieldId="yandexHostedDomain"
    >
      <KeycloakTextInput
        id="yandexHostedDomain"
        {...register("config.hostedDomain")}
      />
    </FormGroup>
  );
};

const MailRuFields = () => {
  const {t} = useTranslation("identity-providers");
  const {register} = useFormContext();

  return (
    <FormGroup
      label={t("mailru.hostedDomain")}
      labelIcon={
        <HelpItem
          helpText="identity-providers-help:mailru:hostedDomain"
          fieldLabelId="identity-providers:mailru:hostedDomain"
        />
      }
      fieldId="mailruHostedDomain"
    >
      <KeycloakTextInput
        id="mailruHostedDomain"
        {...register("config.hostedDomain")}
      />
    </FormGroup>
  );
};

const OkFields = () => {
  const {t} = useTranslation("identity-providers");
  const {register, control} = useFormContext();

  return (
    <>
      <FormGroup
        label={t("ok.publicKey")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:ok:publicKey"
            fieldLabelId="identity-providers:ok:publicKey"
          />
        }
        fieldId="okPublicKey"
      >
        <KeycloakTextInput
          id="okPublicKey"
          isRequired
          {...register("config.publicKey", {required: true})}
        />
      </FormGroup>

      <FormGroup
        label={t("ok.emailRequired")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:ok:emailRequired"
            fieldLabelId="identity-providers:ok:emailRequired"
          />
        }
        fieldId="okEmailRequired"
      >
        <Controller
          name="config.emailRequired"
          defaultValue="false"
          control={control}
          render={({field}) => (
            <Switch
              id="okEmailRequired"
              label={t("common:on")}
              labelOff={t("common:off")}
              isChecked={field.value === "true"}
              onChange={(value) => field.onChange(value.toString())}
              aria-label={t("ok.emailRequired")}
            />
          )}
        />
      </FormGroup>
    </>
  );
};

const VkFields = () => {
  const {t} = useTranslation("identity-providers");
  const {register, control} = useFormContext();

  return (
    <>
      <FormGroup
        label={t("vk.version")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:vk:version"
            fieldLabelId="identity-providers:vk:version"
          />
        }
        fieldId="vkVersion"
      >
        <KeycloakTextInput
          id="vkVersion"
          isRequired
          {...register("config.version", {required: true})}
        />
      </FormGroup>

      <FormGroup
        label={t("vk.fetchedFields")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:vk:fetchedFields"
            fieldLabelId="identity-providers:vk:fetchedFields"
          />
        }
        fieldId="vkFetchedFields"
      >
        <KeycloakTextInput
          id="vkFetchedFields"
          {...register("config.fetchedFields")}
        />
      </FormGroup>

      <FormGroup
        label={t("vk.emailRequired")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:vk:emailRequired"
            fieldLabelId="identity-providers:vk:emailRequired"
          />
        }
        fieldId="vkEmailRequired"
      >
        <Controller
          name="config.emailRequired"
          defaultValue="false"
          control={control}
          render={({field}) => (
            <Switch
              id="vkEmailRequired"
              label={t("common:on")}
              labelOff={t("common:off")}
              isChecked={field.value === "true"}
              onChange={(value) => field.onChange(value.toString())}
              aria-label={t("vk.emailRequired")}
            />
          )}
        />
      </FormGroup>
    </>
  );
};

const EsiaJcpFields = () => {
  const {t} = useTranslation("identity-providers");
  const {register, control} = useFormContext();
  const [isEsiaJcpKeyStoreDropdownOpen, setIsEsiaJcpKeyStoreDropdownOpen] =
    useState(false);
  const [isEsiaJcpAlgorithmDropdownOpen, setIsEsiaJcpAlgorithmDropdownOpen] =
    useState(false);

  return (
    <>
      <FormGroup
        label={t("esiajcp.host")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:esiajcp:host"
            fieldLabelId="identity-providers:esiajcp:host"
          />
        }
        fieldId="esiajcpHost"
      >
        <KeycloakTextInput
          id="esiajcpHost"
          isRequired
          {...register("config.host", {required: true})}
        />
      </FormGroup>

      <FormGroup
        label={t("esiajcp.algorithm")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:esiajcp:algorithm"
            fieldLabelId="identity-providers:esiajcp:algorithm"
          />
        }
        fieldId="esiajcpAlgorithm"
      >
        <Controller
          name="config.algorithm"
          defaultValue="GOST3411_2012_256withGOST3410_2012_256"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <Select
              toggleId="kc-edit-mode"
              required
              onToggle={() =>
                setIsEsiaJcpAlgorithmDropdownOpen(
                  !isEsiaJcpAlgorithmDropdownOpen
                )
              }
              isOpen={isEsiaJcpAlgorithmDropdownOpen}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setIsEsiaJcpAlgorithmDropdownOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
            >
              <SelectOption
                key={0}
                value="GOST3411_2012_512withGOST3410_2012_512"
                isPlaceholder
              >
                ГОСТ Р 34.10-2012 (512)
              </SelectOption>
              <SelectOption
                key={1}
                value="GOST3411_2012_256withGOST3410_2012_256"
              >
                ГОСТ Р 34.10-2012 (256)
              </SelectOption>
            </Select>
          )}
        />
      </FormGroup>

      <FormGroup
        label={t("esiajcp.keyStore")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:esiajcp:keyStore"
            fieldLabelId="identity-providers:esiajcp:keyStore"
          />
        }
        fieldId="esiajcpKeyStore"
      >
        <Controller
          name="config.keyStore"
          defaultValue="HDImageStore"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <Select
              toggleId="kc-edit-mode"
              required
              onToggle={() =>
                setIsEsiaJcpKeyStoreDropdownOpen(!isEsiaJcpKeyStoreDropdownOpen)
              }
              isOpen={isEsiaJcpKeyStoreDropdownOpen}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setIsEsiaJcpKeyStoreDropdownOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
            >
              <SelectOption key={0} value="HDImageStore" isPlaceholder/>
              <SelectOption key={1} value="RuTokenStore"/>
            </Select>
          )}
        />
      </FormGroup>

      <FormGroup
        label={t("esiajcp.ksAlias")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:esiajcp:ksAlias"
            fieldLabelId="identity-providers:esiajcp:ksAlias"
          />
        }
        fieldId="esiajcpKsAlias"
      >
        <KeycloakTextInput
          id="esiajcpKsAlias"
          isRequired
          {...register("config.ksAlias", {required: true})}
        />
      </FormGroup>

      <FormGroup
        label={t("esiajcp.password")}
        labelIcon={
          <HelpItem
            helpText="identity-providers-help:esiajcp:password"
            fieldLabelId="identity-providers:esiajcp:password"
          />
        }
        fieldId="esiajcpPassword"
      >
        <PasswordInput id="esiajcpPassword" {...register("config.password")} />
      </FormGroup>
    </>
  );
};

const FacebookFields = () => {
  const { t } = useTranslation("identity-providers");
  const { register } = useFormContext();

  return (
    <FormGroup
      label={t("facebook.fetchedFields")}
      labelIcon={
        <HelpItem
          helpText={t("identity-providers-help:facebook:fetchedFields")}
          fieldLabelId="identity-providers:facebook:fetchedFields"
        />
      }
      fieldId="facebookFetchedFields"
    >
      <KeycloakTextInput
        id="facebookFetchedFields"
        {...register("config.fetchedFields")}
      />
    </FormGroup>
  );
};

const GithubFields = () => {
  const { t } = useTranslation("identity-providers");
  const { register } = useFormContext();

  return (
    <>
      <FormGroup
        label={t("baseUrl")}
        labelIcon={
          <HelpItem
            helpText={t("identity-providers-help:baseUrl")}
            fieldLabelId="identity-providers:baseUrl"
          />
        }
        fieldId="baseUrl"
      >
        <KeycloakTextInput
          id="baseUrl"
          type="url"
          {...register("config.baseUrl")}
        />
      </FormGroup>
      <FormGroup
        label={t("apiUrl")}
        labelIcon={
          <HelpItem
            helpText={t("identity-providers-help:apiUrl")}
            fieldLabelId="identity-providers:apiUrl"
          />
        }
        fieldId="apiUrl"
      >
        <KeycloakTextInput
          id="apiUrl"
          type="url"
          {...register("config.apiUrl")}
        />
      </FormGroup>
    </>
  );
};

const GoogleFields = () => {
  const { t } = useTranslation("identity-providers");
  const { register, control } = useFormContext();

  return (
    <>
      <FormGroup
        label={t("google.hostedDomain")}
        labelIcon={
          <HelpItem
            helpText={t("identity-providers-help:google:hostedDomain")}
            fieldLabelId="identity-providers:google:hostedDomain"
          />
        }
        fieldId="googleHostedDomain"
      >
        <KeycloakTextInput
          id="googleHostedDomain"
          {...register("config.hostedDomain")}
        />
      </FormGroup>
      <FormGroup
        label={t("google.userIp")}
        labelIcon={
          <HelpItem
            helpText={t("identity-providers-help:google:userIp")}
            fieldLabelId="identity-providers:google:userIp"
          />
        }
        fieldId="googleUserIp"
      >
        <Controller
          name="config.userIp"
          defaultValue="false"
          control={control}
          render={({ field }) => (
            <Switch
              id="googleUserIp"
              label={t("common:on")}
              labelOff={t("common:off")}
              isChecked={field.value === "true"}
              onChange={(value) => field.onChange(value.toString())}
              aria-label={t("google.userIp")}
            />
          )}
        />
      </FormGroup>
      <FormGroup
        label={t("google.offlineAccess")}
        labelIcon={
          <HelpItem
            helpText={t("identity-providers-help:google:offlineAccess")}
            fieldLabelId="identity-providers:google:offlineAccess"
          />
        }
        fieldId="googleOfflineAccess"
      >
        <Controller
          name="config.offlineAccess"
          defaultValue="false"
          control={control}
          render={({ field }) => (
            <Switch
              id="googleOfflineAccess"
              label={t("common:on")}
              labelOff={t("common:off")}
              isChecked={field.value === "true"}
              onChange={(value) => field.onChange(value.toString())}
              aria-label={t("google.offlineAccess")}
            />
          )}
        />
      </FormGroup>
    </>
  );
};

const OpenshiftFields = () => {
  const { t } = useTranslation("identity-providers");
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentityProviderRepresentation>();

  return (
    <FormGroup
      label={t("baseUrl")}
      labelIcon={
        <HelpItem
          helpText={t("identity-providers-help:openshift:baseUrl")}
          fieldLabelId="identity-providers:baseUrl"
        />
      }
      fieldId="baseUrl"
      isRequired
      validated={
        errors.config?.baseUrl
          ? ValidatedOptions.error
          : ValidatedOptions.default
      }
      helperTextInvalid={t("common:required")}
    >
      <KeycloakTextInput
        id="baseUrl"
        type="url"
        isRequired
        {...register("config.baseUrl", { required: true })}
      />
    </FormGroup>
  );
};

const PaypalFields = () => {
  const { t } = useTranslation("identity-providers");
  const { control } = useFormContext();

  return (
    <FormGroup
      label={t("paypal.sandbox")}
      labelIcon={
        <HelpItem
          helpText={t("identity-providers-help:paypal:sandbox")}
          fieldLabelId="identity-providers:paypal:sandbox"
        />
      }
      fieldId="paypalSandbox"
    >
      <Controller
        name="config.sandbox"
        defaultValue="false"
        control={control}
        render={({ field }) => (
          <Switch
            id="paypalSandbox"
            label={t("common:on")}
            labelOff={t("common:off")}
            isChecked={field.value === "true"}
            onChange={(value) => field.onChange(value.toString())}
            aria-label={t("paypal.sandbox")}
          />
        )}
      />
    </FormGroup>
  );
};

const StackoverflowFields = () => {
  const { t } = useTranslation("identity-providers");
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentityProviderRepresentation>();

  return (
    <FormGroup
      label={t("stackoverflow.key")}
      labelIcon={
        <HelpItem
          helpText={t("identity-providers-help:stackoverflow:key")}
          fieldLabelId="identity-providers:stackoverflow:key"
        />
      }
      fieldId="stackoverflowKey"
      isRequired
      validated={
        errors.config?.key ? ValidatedOptions.error : ValidatedOptions.default
      }
      helperTextInvalid={t("common:required")}
    >
      <KeycloakTextInput
        id="stackoverflowKey"
        isRequired
        {...register("config.key", { required: true })}
      />
    </FormGroup>
  );
};

const LinkedInFields = () => {
  const { t } = useTranslation("identity-providers");
  const { register } = useFormContext();

  return (
    <FormGroup
      label={t("linkedin.profileProjection")}
      labelIcon={
        <HelpItem
          helpText={t("identity-providers-help:linkedin.profileProjection")}
          fieldLabelId="identity-providers:linkedin.profileProjection"
        />
      }
      fieldId="profileProjection"
    >
      <KeycloakTextInput
        id="profileProjection"
        {...register("config.profileProjection")}
      />
    </FormGroup>
  );
};
