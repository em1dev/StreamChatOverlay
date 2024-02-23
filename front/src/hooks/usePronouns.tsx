import { useCallback, useEffect, useState } from "react";
import { pronounsApi } from "../api/pronounsApi";
import { PronounResponse } from "../api/pronounsApi/types";

export const usePronouns = () => {
  const [pronouns, setPronouns] = useState<PronounResponse | null>(null);

  const getPronounsFromTwitchName = useCallback(async (userName: string) => {
    if (!pronouns) return;

    const { data } = await pronounsApi.getUser(userName);
    if (!data) return;

    const primary = pronouns[data.pronoun_id];
    const secondary = data.alt_pronoun_id ? pronouns[data.alt_pronoun_id] : undefined;

    // if user does not have secondary pronoun or we can't find secondary in memory fallback to primary only
    if (primary && !secondary) {
      return primary.singular ? primary.subject : `${primary.subject}/${primary.object}`;
    }

    if (secondary) {
      return `${primary.subject}/${secondary.subject}`;
    }
  }, [pronouns]);

  useEffect(() => {
    (async () => {
      const data = await pronounsApi.getPronouns();
      if (data.hasError || !data.data) {
        return;
      }

      setPronouns(data.data);
    })();
  }, []);

  return {
    getPronounsFromTwitchName
  };
};