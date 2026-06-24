import { prisma } from './prismaDb';


export interface SettingItem {
  id: number,
  userId: number,
  settingsJson: string,
  secretKey: string
}

const getSettingsForUser = async (userId: number) => (
  await prisma.setting.findMany({
    where: {
      userId: {
        equals: userId
      }
    }
  })
);

const createSettingsForUser = async (userId: number, settings: string, secretKey: string) => (
  await prisma.setting.create({
    data: {
      name: 'Settings 1',
      secretKey,
      settingsJson: settings,
      userId
    },
  })
);

// updates all the settings, which is fine until we start adding multiple settings per user
// TODO - make unique
const updateSettingJsonForUser = async (userId:number, settings: string) => (
  await prisma
    .setting
    .updateMany({
      data: {
        settingsJson: settings
      },
      where: {
        userId: {
          equals: userId
        }
      }
    })
);

// updates all the settings, which is fine until we start adding multiple settings per user
// TODO - make unique
const updateSecretKeyForUser = async (userId:number, secretKey: string) => (
  await prisma
    .setting
    .updateMany({
      data: {
        secretKey
      },
      where: {
        userId: {
          equals: userId
        }
      }
    })
);

export const SettingsRepository = {
  getSettingsForUser,
  createSettingsForUser,
  updateSecretKeyForUser,
  updateSettingJsonForUser
};
