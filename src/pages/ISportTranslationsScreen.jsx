import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import ISportHeader from '../components/ISportHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams[0]}</Text>
        <Text style={styles.teamsSecond}>{teams[1]}</Text>
      </View>

      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>x
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ISportHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100, marginTop: 15}}>
        {renderBroadcast('EPL', '05.03 16:00', [
          'Manchester United',
          'Liverpool',
        ])}

        {renderBroadcast('La Liga', '12.04 21:00', [
          'Real Madrid',
          'Atletico Madrid',
        ])}

        {renderBroadcast('NBA', '20.05 19:30', [
          'Golden State Warriors',
          'Milwaukee Bucks',
        ])}

        {renderBroadcast('NHL', '25.06 22:15', [
          'New York Rangers',
          'Washington Capitals',
        ])}

        {renderBroadcast('MLB', '30.07 18:45', [
          'Boston Red Sox',
          'Houston Astros',
        ])}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 40,
    borderColor: 'rgba(19, 55, 141, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
  },
  league: {
    fontSize: 40,
    fontFamily: FONTS.regular,
    color: COLORS.main,
    textAlign: 'left',
    paddingBottom: 10,
  },
  leagueContainer: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  teamsContainer: {
    width: '65%',
  },
  matchTime: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    textAlign: 'center',
    width: '50%',
    position: 'absolute',
    bottom: -25,
    backgroundColor: COLORS.placeholder,
    borderRadius: 12,
    alignSelf: 'center',
  },
  teams: {
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.white,
    marginLeft: 5,
    height: 45,
  },
  teamsSecond: {
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.white,
    marginLeft: 5,
    height: 45,
    borderBottomRightRadius: 12,
  },
});
