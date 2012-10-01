package name.nanek.lastcall.server;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import name.nanek.lastcall.client.GreetingService;

import com.google.gwt.user.server.rpc.RemoteServiceServlet;

@SuppressWarnings("serial")
public class GreetingServiceImpl extends RemoteServiceServlet implements
		GreetingService {

	private static TimeZone tz = TimeZone.getTimeZone("America/Los_Angeles");
	
	private static final DateFormat NUMERIC_DATE = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	static {
		NUMERIC_DATE.setTimeZone(tz);
		
	}
	public static Date parseNumericDate(final String dateString) {
		try { 
			Date parsed = NUMERIC_DATE.parse(dateString); 
			return parsed;
		} catch (ParseException e) {
			throw new RuntimeException("Couldn't parse date.", e);
		} 
	}
	
	//Set to 9AM Pacific time on the day of Google IO 2011.
	//Amusingly, the official Google IO 2011 countdown timer jumps 3 hours if I change my local computer from Eastern to Pacific, 
	//even though the number of hours until the event should be the same. I didn't copy that functionality, assuming it's a bug.
	//So my implementation matches what it reports when the local computer is set to Pacific. But if you change the local computer
	//to Eastern, mine still reports the same number of hours until Google IO, whereas the official one jumps 3 hours.
	private static Date targetDate = parseNumericDate("2011-05-10 09:00:00");
	
	public long getTargetTime() throws IllegalArgumentException {
		return targetDate.getTime();
	}
}
